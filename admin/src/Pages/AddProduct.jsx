import React from "react"
import ProductForm from "../Components/Forms/ProductForm";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
`


const InnerContainer = styled.div`
    padding: 4rem;
    max-width: 1000px;
`

const AddProduct = (props) => {
    return (
        <Container>
            <InnerContainer>
                <ProductForm type="add" />
            </InnerContainer>
        </Container>
    )
};

export default AddProduct;
