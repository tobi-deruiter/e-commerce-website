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
    const [productSliderData, setProductSliderData] = useState({
        value: 4,
        min: Math.round(width/500),
        max: Math.round(width/200)
    });

    const getProducts = async () => {
        await API_Client.searchProducts().then((data)=>{setProductsData(data)});
    }

    const handleProductWidth = (e) => {
        setProductWidth((width - 10 - (40*e.target.value)) / e.target.value);
        setProductSliderData({
            value: e.target.value,
            min: Math.round(width/450),
            max: Math.round(width/200)
        });
    }

    useEffect(()=>{
        getProducts();
    }, []);

    useEffect(()=>{
        setProductsData(props.productsData);
    }, [props.productsData]);

    useEffect(() => {
        const newValue = (productSliderData.value > Math.round(width/200)) ? Math.round(width/200) : (productSliderData.value < Math.round(width/450)) ? Math.round(width/450) : productSliderData.value;
        setProductWidth((width - 10 - (40*newValue)) / newValue);
        setProductSliderData({
            value: newValue,
            min: Math.round(width/450),
            max: Math.round(width/200)
        });
    }, [width])

    return (
        <AllProductsContainer ref={containerRef}>
            <Row>
                <Col>
                    <h1>All Products</h1>
                </Col>
                <ProductSizeRangeCol xs="3">
                    <ProdcutSizeRange
                        value={productSliderData.value}
                        min={productSliderData.min}
                        max={productSliderData.max}
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
                                return <Item key={i} data={item} width={productWidth}  />
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
