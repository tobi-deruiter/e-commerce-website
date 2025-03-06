import React from "react"
import Card from 'react-bootstrap/Card';
import styled from "styled-components";
import ThemeButton from "./Pieces/ThemeButton";

const ProductCard = styled(Card)`
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
`

const Item = (props) => {
    return (
        <ProductCard style={{width: props.width}}>
            <ProductCard.Img variant="top" src={props.data.image_url} />
            <ProductCard.Body>
                <ProductCard.Title>{props.data.title}</ProductCard.Title>
            </ProductCard.Body>
        </ProductCard>
    )
};

export default Item;
