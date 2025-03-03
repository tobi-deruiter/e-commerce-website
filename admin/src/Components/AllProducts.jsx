import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styled from 'styled-components';
import Item from "./Item";

import API_Client from "../api/api.client";

const AllProductsContainer = styled(Container)`
    margin: 2rem auto;
`

const AllProductsRow = styled(Row)`
    display: flex !important;
    max-height: 500px;
    gap: 2rem;
    padding: 1rem;
`

const AllProductsItem = styled(Item)`
    gap: 5rem !important;
`

const AllProducts = (props) => {
    const [data, setResData] = useState({});

    const getProducts = async () => {
        await API_Client.searchProducts().then((data)=>{setResData(data)});
    }

    useEffect(()=>{
        getProducts();
    }, []);

    return (
        <AllProductsContainer>
            <h1>All Products</h1>
            <hr></hr>
            <AllProductsRow>
                {
                    data ? 
                        data.success ?
                            data.products.map((item, i)=>{
                                return <AllProductsItem key={i} id={item._id} image={item.image_url} title={item.title} description={item.description}  />
                            }) :
                            <p>{data.error}</p>
                        :
                        <h1>Loading...</h1>
                }
            </AllProductsRow>
        </AllProductsContainer>
    )
};

export default AllProducts;
