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
}

export default API_Client;