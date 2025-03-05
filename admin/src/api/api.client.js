class API_Client {
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
}

export default API_Client;