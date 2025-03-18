import React, { useEffect, useState } from "react"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from "styled-components";
import ProductForm from "./Forms/ProductForm";

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

const Container = styled.div`
    padding: 0 5rem 2rem 3rem;
    max-width: 1000px;
`

const Item = (props) => {
    const [show, setShow] = useState(false);
    const [checked, setChecked] = useState(false);

    const handleClose = () => setShow(false);
    const handleClick = (e) => {
        props.setPreviousSelectAll(props.selectAll);
        if (!props.allowSelect)
            setShow(true);
        else {
            setChecked(!checked);
        }
    };

    useEffect(() => {
        !(!props.selectAll && props.previousSelectAll) && props.onSelect(checked, props.data);
    }, [checked])

    useEffect(() => {
        setChecked(props.selectAll);
    }, [props.selectAll])

    return (
        <>
            <ProductCard style={{width: props.width}} onClick={handleClick}>
                <Card.Header className="d-flex">
                    {props.data.title}
                    {
                        props.allowSelect ? 
                                <Form.Check
                                    className="ms-auto"
                                    value={props.data}
                                    checked={checked}
                                    readOnly
                                />
                            : <></>
                    }
                </Card.Header>
                <ProductBody>
                    <ImgContainer>
                        <Img variant="top" src={props.data.image_url} />
                    </ImgContainer>
                    <ProductTitle>
                        ${
                            (props.data.price.toString().match(/^[1-9][0-9]*\.[0-9]$/)) ?
                                    props.data.price.toString() + '0'
                                :
                                    (!props.data.price.toString().match(/^[1-9][0-9]*\.[0-9]{2}$/)) ?
                                            props.data.price.toString() + '.00'
                                        :
                                            props.data.price
                        }
                    </ProductTitle>
                    <ProductCard.Text>{props.data.description}</ProductCard.Text>
                </ProductBody>
            </ProductCard>

            <OffcanvasEditForm show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h2>Product Edit</h2></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                        <ProductForm type="edit" data={props.data} />
                    </Container>
                </Offcanvas.Body>
            </OffcanvasEditForm>
        </>
    )
};

export default Item;
