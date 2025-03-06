import React, { useState } from "react"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from "styled-components";
import EditProductForm from "./Forms/EditProductForm";

const ProductCard = styled(Card)`
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
    cursor: pointer;
    display: flex;
    padding: 0;
    transition: .3s ease;

    &:hover {
        border: 1px solid blue;
        transform: scale(1.15, 1.15);
        z-index: 1000;
    }
`

const ImgContainer = styled.div`
    height: fit-content;
`

const Img = styled(Card.Img)`
    position: relative;
    top: 50%;
    translate: 0 -50%;
    display: block;
    max-width: 100%;
    height: fit-content;
    width: auto;
`

const ProductBody = styled(Card.Body)`
    display: flex;
    flex-direction: column;
`

const ProductTitle = styled(Card.Title)`
    margin-top: auto;
    text-align: center;
`

const OffcanvasEditForm = styled(Offcanvas)`
    width: fit-content !important;
`

const Item = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <ProductCard style={{width: props.width}} onClick={handleShow}>
                <Card.Header>{props.data.title}</Card.Header>
                <ProductBody>
                    <ImgContainer>
                        <Img variant="top" src={props.data.image_url} />
                    </ImgContainer>
                    <ProductTitle>${props.data.price}</ProductTitle>
                    <ProductCard.Text>{props.data.description}</ProductCard.Text>
                </ProductBody>
            </ProductCard>

            <OffcanvasEditForm show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h2>Product Edit</h2></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <EditProductForm data={props.data} />
                </Offcanvas.Body>
            </OffcanvasEditForm>
        </>
    )
};

export default Item;
