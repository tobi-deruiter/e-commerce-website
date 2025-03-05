import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import styled from "styled-components";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useFormik } from 'formik';
import * as yup from 'yup';
import API_Client from "../api/api.client";
import ProductTagsSwitches from "./Forms/ProductTagsSwitches";
import DoubleRangeForm from "./Forms/DoubleRangeForm";
import DateRangeForm from "./Forms/DateRangeForm";

const CardHeader = styled(Card.Header)`
    display: flex;
    gap: 0.25rem;
`

const SortItem = styled(Dropdown.Item)`
    text-align: right;
`

const FilterLabelCol = styled(Col)`
    margin-right: 1rem;
`

const FilterLabel = styled(InputGroup.Text)`
    position: relative;
    top: 50%;
    translate: 0 -50%;
    width: fit-content;
`

const FilterRow = styled(Row)`
    margin-bottom: 2rem;
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
    const [maxSales, setMaxSales] = useState(1000)
    const [maxQuantity, setMaxQuantity] = useState(1000)
    const [priceRange, setPriceRange] = useState({min: 0, max: maxPrice});
    const [salesRange, setSalesRange] = useState({min: 0, max: maxSales});
    const [quantityRange, setQuantityRange] = useState({min: 0, max: maxQuantity});
    const [dateRange, setDateRange] = useState({ startDate: null, endDate: null })
    const [sort, setSort] = useState('relevance');

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

    const handleSalesRange = (min, max) => {
        setSalesRange({min: min, max: max});
    }

    const handleQuantityRange = (min, max) => {
        setQuantityRange({min: min, max: max});
    }

    const handleDateRange = (rangeSelection) => {
        rangeSelection != null ?
                setDateRange({ startDate: rangeSelection[0], endDate: rangeSelection[1] })
            :
                setDateRange({ startDate: null, endDate: null });
    }

    const handleSort = (eventKey, event) => {
        console.log(eventKey)
        setSort(eventKey);
    }

    // Getters from database
    const getTags = async () => {
        await API_Client.getProductTags().then((data)=>setCurrentTags(data));
    }

    const getMax = async (field) => {
        const data = await API_Client.getMax(field);
        switch (field) {
            case API_Client.GET_MAX_PRICE:
                setMaxPrice(data);
                break;
            case API_Client.GET_MAX_SALES:
                setMaxSales(data);
                break;
            case API_Client.GET_MAX_QUANTITY:
                setMaxQuantity(data);
                break;
        }
        
    }

    useEffect(()=>{
        getTags();
        getMax(API_Client.GET_MAX_PRICE);
        getMax(API_Client.GET_MAX_SALES);
        getMax(API_Client.GET_MAX_QUANTITY);
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
                min_sales: salesRange.min,
                max_sales: salesRange.max,
                min_quantity: quantityRange.min,
                max_quantity: quantityRange.max,
                min_date: dateRange.startDate,
                max_date: dateRange.endDate,
                sort: sort,
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
                    <CardHeader>
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
                        <Dropdown onSelect={handleSort}>
                            <Dropdown.Toggle>Sort By</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <SortItem eventKey="relevance">Relevance</SortItem>
                                <SortItem eventKey="popular">Popular</SortItem>
                                <SortItem eventKey="alphabetically">Alphabetically</SortItem>
                                <SortItem eventKey="lowest_price">Lowest Price</SortItem>
                                <SortItem eventKey="highest_price">Highest Price</SortItem>
                                <SortItem eventKey="lowest_quantity">Lowest Quantity</SortItem>
                                <SortItem eventKey="highest_quantity">Highest Quantity</SortItem>
                                <SortItem eventKey="earliest_date">Earliest Date</SortItem>
                                <SortItem eventKey="latest_date">Latest Date</SortItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </CardHeader>
                    <Accordion.Collapse eventKey="filter">
                        <Card.Body>
                            <FilterRow>
                                <ProductTagsSwitches onChange={handleTags} tagsData={currentTags} />
                            </FilterRow>
                            <FilterRow>
                                <FilterLabelCol md="1">
                                    <FilterLabel>Price</FilterLabel>
                                </FilterLabelCol>
                                <Col>
                                    <DoubleRangeForm min={0} max={maxPrice} steps={0.01} onRangeChange={handlePriceRange} />
                                </Col>
                            </FilterRow>
                            <FilterRow>
                                <FilterLabelCol md="1">
                                    <FilterLabel>Sales</FilterLabel>
                                </FilterLabelCol>
                                <Col>
                                    <DoubleRangeForm min={0} max={maxSales} onRangeChange={handleSalesRange} />
                                </Col>
                            </FilterRow>
                            <FilterRow>
                                <FilterLabelCol md="1">
                                    <FilterLabel>Quantity</FilterLabel>
                                </FilterLabelCol>
                                <Col>
                                    <DoubleRangeForm min={0} max={(maxQuantity > 0) ? maxQuantity : 1} onRangeChange={handleQuantityRange} />
                                </Col>
                            </FilterRow>
                            <FilterRow>
                                <FilterLabelCol md="2">
                                    <FilterLabel>Select Date(s) Posted</FilterLabel>
                                </FilterLabelCol>
                                <Col>
                                    <DateRangeForm onRangeChange={handleDateRange} />
                                </Col>
                            </FilterRow>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </Form>
    )
};

export default Searchbar;
