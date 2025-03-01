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
        return await fetch(`${import.meta.env.VITE_API_URL}/products/?${query}`, {
            method: 'GET',
            headers: {
                Accept: 'applicatoin/json',
            },
        })
        .then((res)=>res.json());
    }
}

export default API_Client;