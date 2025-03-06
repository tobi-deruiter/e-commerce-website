import React, { useEffect, useRef, useState } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import styled from 'styled-components';
import Item from "./Item";

import API_Client from "../api/api.client";
import { useContainerWidth } from "../Hooks/useContainerWidth";

const AllProductsContainer = styled(Container)`
    margin: 2rem auto;
`

const AllProductsRow = styled(Row)`
    gap: 2rem;
    padding: 1rem;
`

const ProductSizeRangeCol = styled(Col)`
    display: flex;
`

const ProdcutSizeRange = styled(Form.Range)`
    margin: auto 0;
`

const AllProducts = (props) => {
    const [productsData, setProductsData] = useState({});
    const containerRef = useRef(null);
    const width = useContainerWidth(containerRef);
    const [productWidth, setProductWidth] = useState(200);
    const [productWidthDivider, setProductWidthDivider] = useState(4);

    const getProducts = async () => {
        await API_Client.searchProducts().then((data)=>{setProductsData(data)});
    }

    const handleProductWidth = (e) => {
        setProductWidthDivider(e.target.value);
        setProductWidth((width - 10 - (40*e.target.value)) / e.target.value);
    }

    useEffect(()=>{
        getProducts();
    }, []);

    useEffect(()=>{
        setProductsData(props.productsData);
    }, [props.productsData]);

    useEffect(() => {
        setProductWidth((width - (50*productWidthDivider)) / productWidthDivider);
    }, [width])

    return (
        <AllProductsContainer ref={containerRef}>
            <Row>
                <Col>
                    <h1>All Products</h1>
                </Col>
                <ProductSizeRangeCol>
                    <ProdcutSizeRange
                        value={productWidthDivider}
                        min={Math.round(width/500)}
                        max={Math.round(width/200)}
                        onChange={handleProductWidth}
                    />
                </ProductSizeRangeCol>
            </Row>
            <hr></hr>
            <AllProductsRow>
                {
                    productsData ? 
                        productsData.success ?
                            productsData.products.map((item, i)=>{
                                return <Item key={i} id={item._id} image={item.image_url} title={item.title} description={item.description} width={productWidth}  />
                            }) :
                            <p>{productsData.error}</p>
                        :
                        <h1>Loading...</h1>
                }
            </AllProductsRow>
        </AllProductsContainer>
    )
};

export default AllProducts;
