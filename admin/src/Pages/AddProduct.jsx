import React from "react"
import AddProductForm from "../Components/AddProductForm";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
`

const AddProduct = (props) => {
    return (
        <Container>
            <AddProductForm />
        </Container>
    )
};

export default AddProduct;
