import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import styled from "styled-components";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as yup from 'yup';
import API_Client from "../api/api.client";
import ProductTagsSwitches from "./Forms/ProductTagsSwitches";
import DoubleRangeForm from "./Forms/DoubleRangeForm";

const CardHeader = styled(Card.Header)`
    display: flex;
    gap: 0.25rem;
`

function FilterToggle( {children, eventKey} ) {
    const onClickToggle = useAccordionButton(eventKey, () => {});

    return (
        <Button onClick={onClickToggle} variant="outline-primary" >
            {children}
        </Button>
    )
}

const Searchbar = (props) => {
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [tags, setTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);
    const [maxPrice, setMaxPrice] = useState(1000)
    const [priceRange, setPriceRange] = useState({min: 0, max: maxPrice});
    // Handlers
    const handleSearchQuery = (e) => {
        formik.handleChange(e);
        setSearchQuery(e.target.value);
        formik.handleSubmit(e);
    }

    const handleTags = (e) => {
        formik.handleChange(e);
        let changedTags = tags;
        if (e.target.checked) {
            changedTags.push(e.target.value)
            setTags(changedTags);
        } else {
            setTags(changedTags.filter(tag => tag != e.target.value));
        }
    }

    const handlePriceRange = (min, max) => {
        setPriceRange({min: min, max: max});
    }

    // Getters from database
    const getTags = async () => {
        await API_Client.getProductTags().then((data)=>setCurrentTags(data));
    }

    const getMaxPrice = async () => {
        await API_Client.getMaxPrice().then((data)=>setMaxPrice(data));
    }

    useEffect(()=>{
        getTags();
        getMaxPrice();
    }, []);

    const formik = useFormik({
        initialValues: {
            search: '',
            tags: [],
            available: true,
            min_price: '',
            max_price: '',
            min_sales: '',
            max_sales: '',
            min_quantity: '',
            max_quantity: '',
            min_date: '',
            max_date: '',
        },
        validationSchema: yup.object().shape({
            search: yup.string(),
            tags: yup.array(),
            available: yup.boolean(),
            min_price: yup.number(),
            max_price: yup.number(),
            min_sales: yup.number(),
            max_sales: yup.number(),
            min_quantity: yup.number(),
            max_quantity: yup.number(),
            min_date: yup.date(),
            max_date: yup.date(),
        }),
        onSubmit: async (e) => {
            setLoading(true);
            const searchData = {
                search: searchQuery,
                tags: tags,
                min_price: priceRange.min,
                max_price: priceRange.max,
            }
            console.log(searchData);

            try {
                const response = await API_Client.searchProducts(searchData);

                if (!response.success) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                props.handleProductSearch(response);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
            }
        }
    });

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <Accordion>
                <Card>
                    <CardHeader className="d-flex">
                        <Form.Control
                            type="search"
                            name="search"
                            value={formik.values.search}
                            onChange={handleSearchQuery}
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <Button disabled={loading} type="submit">{!loading ? "Submit" : "Loading..."}</Button>
                        <FilterToggle eventKey="filter">Filter</FilterToggle>
                    </CardHeader>
                    <Accordion.Collapse eventKey="filter">
                        <Card.Body>
                            <Row>
                                <ProductTagsSwitches onChange={handleTags} tagsData={currentTags} />
                            </Row>
                            <Row>
                                <Col md="1">
                                    <Form.Label>Price</Form.Label>
                                </Col>
                                <Col>
                                    <DoubleRangeForm min={0} max={maxPrice} steps={0.01} onRangeChange={handlePriceRange} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Form>
    )
};

export default Searchbar;
