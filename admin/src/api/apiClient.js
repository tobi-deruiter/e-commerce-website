class API_Client {

    /** GET REQUESTS START */

    static async searchProducts(searchData={}) {
        const query = new URLSearchParams();
        for (const key in searchData) {
            if (key != 'tags')
                query.append(key, searchData[key])
            else
                for (const i in searchData[key])
                    query.append(key, searchData[key][i])
        }

        try {
            return await fetch(`${import.meta.env.VITE_API_URL}/products/?${query}`, {
                method: 'GET',
                headers: {
                    Accept: 'applicatoin/json',
                },
            }).then((res)=>res.json());
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    static async getProductTags() {
        try {
            return await fetch(`${import.meta.env.VITE_API_URL}/products/get-tags`, {
                method: 'GET',
                headers: {
                    Accept: 'applicatoin/json',
                },
            }).then((res)=>res.json());
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    static GET_MAX_PRICE = 'price';
    static GET_MAX_SALES = 'sales';
    static GET_MAX_QUANTITY = 'quantity';
    static async getMax(field) {
        const query = new URLSearchParams();
        switch (field) {
            case API_Client.GET_MAX_PRICE:
                query.append('sort', 'highest_price');
                break;
            case API_Client.GET_MAX_SALES:
                query.append('sort', 'popular');
                break;
            case API_Client.GET_MAX_QUANTITY:
                query.append('sort', 'highest_quantity');
                break;
        }
        
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/products/?${query}`, {
                method: 'GET',
                headers: {
                    Accept: 'applicatoin/json',
                },
            }).then((res)=>res.json());

            if (!response.success) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            switch (field) {
                case API_Client.GET_MAX_PRICE:
                    return response.products[0].price;
                case API_Client.GET_MAX_SALES:
                    return response.products[0].sales;
                case API_Client.GET_MAX_QUANTITY:
                    return response.products[0].quantity;
            }
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    static async getProductsById(ids) {
        const query = new URLSearchParams();
        for (const key in ids) {
            query.append('product_ids', ids[key])
        }

        try {
            return await fetch(`${import.meta.env.VITE_API_URL}/products/search-by-id/?${query}`, {
                method: 'GET',
                headers: {
                    Accept: 'applicatoin/json',
                },
            }).then((res)=>res.json());
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    /** GET REQUESTS END */

    /** POST REQUESTS START */

    static async addNewProduct(formData) {
        try {
            return await fetch(`${import.meta.env.VITE_API_URL}/products/upload`, {
                method: 'POST',
                headers: {
                    Accept: 'applicatoin/json',
                },
                body: formData,
            }).then((res)=>res.json());
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    static async updateProduct(formData) {
        try {
            return await fetch(`${import.meta.env.VITE_API_URL}/products/update-one`, {
                method: 'POST',
                headers: {
                    Accept: 'applicatoin/json',
                },
                body: formData,
            }).then((res)=>res.json());
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    static async updateManyProducts(formData) {
        try {
            return await fetch(`${import.meta.env.VITE_API_URL}/products/update-many`, {
                method: 'POST',
                headers: {
                    Accept: 'applicatoin/json',
                },
                body: formData,
            }).then((res)=>res.json());
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    static async updateDefaultSettingsProduct(data) {
        const formData = new FormData();
        formData.append('product_id', import.meta.env.VITE_PRODUCT_DEFAULT_SETTINGS_ID);
        for (const item in data) {
            if (item == "tags") {
                for (const i in data[item])
                    formData.append("tags[]", data[item][i])
            }
        }

        try {
            return await fetch(`${import.meta.env.VITE_API_URL}/products/update-one`, {
                method: 'POST',
                headers: {
                    Accept: 'applicatoin/json',
                },
                body: formData,
            }).then((res)=>res.json());
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    static async deleteProducts(productIds) {
        const formData = new FormData();
        for (const item in productIds) {
            formData.append('product_ids[]', productIds[item]);
        }

        try {
            return await fetch(`${import.meta.env.VITE_API_URL}/products/delete`, {
                method: 'POST',
                headers: {
                    Accept: 'applicatoin/json',
                },
                body: formData,
            }).then((res)=>res.json());
        } catch (err) {
            return {
                success: false,
                error: err
            }
        }
    }

    /** POST REQUESTS END */
}

export default API_Client;