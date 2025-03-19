import React, { useState } from "react"
import AllProducts from "../Components/AllProducts";
import Searchbar from "../Components/Searchbar";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 2rem;
`

const Main = (props) => {
    const [productsData, setProductsData] = useState([]);

    const handleProductsChange = (productsData) => {
        setProductsData(productsData);
    }

    return (
        <Container>
            <Searchbar height={props.height} handleProductSearch={handleProductsChange} />
            <AllProducts productsData={productsData} />
        </Container>
    )
};

export default Main;
