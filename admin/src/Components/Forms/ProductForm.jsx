import React, { useState, useEffect, useRef } from "react"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from "styled-components";
import TagForm from "./TagForm";
import NewTagForm from "./NewTagForm";
import API_Client from "../../api/apiClient";
import img_placeholder from '../../assets/images_placeholder.png'
import ResultToast from "../ResultToast";

const ProductImage = styled(Image)`
    max-width: 100%;
    width: 300px;
    margin: 0 1rem 1rem;
`

const ProductForm = (props) => {

    /** HOOKS */

    const descriptionRef = useRef(null);
    const [productData, setProductData] = useState({
        title: props.data?.title ?? '',
        price: props.data?.price ?? '',
        description: props.data?.description ?? '',
        tags: props.data?.tags ?? [],
        image: false
    });
    const [formValidity, setFormValidity] = useState({
        touched: {
            title: false,
            price: false,
            description: false,
            image: false
        },
        errors: {
            title: true,
            price: true,
            description: true,
            image: true
        }
    })
    // const [tags, setTags] = useState(props.data?.tags ?? []);
    // const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentTags, setCurrentTags] = useState([]);
    const [portfolioOptions, setPortfolioOptions] = useState([]);
    const [showResToast, setShowResToast] = useState(false);
    const [formResult, setFormResult] = useState({ success: false});
    const [formSuccessMessage, setFormSuccessMessage] = useState("You have successfully saved this product.");

    // const formik = useFormik({
    //     initialValues: {
    //         title: props.data?.title ?? '',
    //         description: props.data?.description ?? '',
    //         price: props.data?.price ?? '',
    //         file: props.data?.image_url ?? null,
    //     },
    //     validationSchema: yup.object().shape({
    //         title: yup.string(),
    //         description: yup.string(),
    //         price: yup.number(),
    //         file: yup.mixed(),
    //     }),
    //     onSubmit: 
    // });

    /** HANDLERS */

    const handleToastOpen = (res, message) => {
        setFormSuccessMessage(message);
        setFormResult(res);
        setShowResToast(true);
    }

    const handleToastClose = () => setShowResToast(false);

    const handleProductData = (e, name, value) => {
        let pair = { name: name, value: value };
        if (!!e) {
            if (e.target.name != 'image')
                pair = { name: e.target.name, value: e.target.value };
            else
                pair = { name: e.target.name, value: e.target.files[0] };
        }
        setProductData({ ...productData, [pair.name]: pair.value });
        setFormValidity(handleFormValidity(pair.name, pair.value));
    };

    const handleFormValidity = (name, value, validity=formValidity) => {
        validity = { ...validity, ["touched"]: { ...validity.touched, [name]: true }};
        let isInvalid = false;
        switch (name) {
            case 'title':
            case 'description':
                isInvalid = value.length == 0;
                break;
            case 'price':
                isInvalid = value.length == 0 || typeof (+value) !== 'number' || !Number.isFinite(+value);
                break;
            case 'image':
                isInvalid = !value && !props.data;
                break;
        }
        validity = { ...validity, ["errors"]: { ...validity.errors, [name]: (props.type != "massEdit") ? isInvalid : false }};
        return validity;
    }

    const handleFormatPrice = (e) => {
        const price = (!!e) ? e.target.value : productData.price.toString();
        let formattedPrice = price;
        if (!formValidity.errors.price && !price.match(/^[1-9][0-9]*\.[0-9]{2}$/)) {
            while (formattedPrice.startsWith('0'))
                formattedPrice = formattedPrice.substring(1);
            if (formattedPrice.indexOf('.') != -1) {
                while (formattedPrice.length < formattedPrice.indexOf('.')+3)
                    formattedPrice = formattedPrice + '0';
                formattedPrice = formattedPrice.substring(0, formattedPrice.indexOf('.')+3);
            } else {
                formattedPrice = formattedPrice + '.00';
            }
            handleProductData(null, 'price', formattedPrice);
        }
        return formattedPrice;
    }

    const handleTags = (e) => {
        // formik.handleChange(e);
        let changedTags = productData.tags;
        if (e.target.checked) {
            if (e.target.value.startsWith(import.meta.env.VITE_PORTFOLIO_TAG_PREFIX))
                changedTags = changedTags.filter(tag => !tag.startsWith(import.meta.env.VITE_PORTFOLIO_TAG_PREFIX))
            changedTags.push(e.target.value)
            handleProductData(null, "tags", changedTags);
        } else {
            handleProductData(null, "tags", changedTags.filter(tag => tag != e.target.value));
        }
    }

    const handleNewTag = (newTag) => {
        let changedTags = productData.tags;
        if (productData.tags.indexOf(newTag) === -1) {
            changedTags.push(newTag)
            handleProductData(null, "tags", changedTags);
        } else {
            handleProductData(null, "tags", changedTags.filter(tag => tag != newTag));
        }
    }

    const handleDeleteProduct = async () => {
        setLoading(true);
        if (props.data && confirm(`Are you sure you would like to delete "${props.data.title}"?\n\nTHIS IS A PERMANENT ACTION`)) {
            const res = await API_Client.deleteProducts([props.data._id]);
            handleToastOpen(res, `Successfully deleted "${props.data.title}"`)
        }
        setLoading(false);
    }

    const handleFormData = () => {
        /** Validity Check */
        let validity = formValidity;
        for (const key in productData) {
            validity = handleFormValidity(key, productData[key], validity)
            if (validity.errors[key]) {
                setFormValidity(validity);
                throw new Error(`You must fill out the form for the ${key}.`)
            }
        }
        setFormValidity(validity);

        if (props.type != "massEdit" && !portfolioOptions.some(option => productData.tags.includes(option))) {
            console.log(productData.tags)
            throw new Error("You must choose a portfolio.")
        }

        if (props.type != "massEdit" && productData.tags.filter(tag => !tag.startsWith(import.meta.env.VITE_PORTFOLIO_TAG_PREFIX)).length == 0) {
            throw new Error(`You must choose at least 1 tag.`);
        }

        if (!!productData.file && !props.data) {
            throw new Error("You must choose a product image!");
        }

        /** Create Form Data */
        const formData = new FormData();

        if (props.type == "massEdit") {
            for (const i in props.selectedProducts) {
                formData.append('product_ids[]', props.selectedProducts[i]._id)
            }
        }
        
        (props.data && props.type != "massEdit") && formData.append('product_id', props.data._id);

        for (const key in productData) {
            if (key != 'tags') {
                if (key == 'image' && props.type != "massEdit")
                    formData.append('file', productData[key])
                else if (key == 'price')
                    formData.append(key, handleFormatPrice())
                else
                    formData.append(key, productData[key])
            }
            else {
                for (const i in productData[key])
                    formData.append(`${key}[]`, productData[key][i])
            }
        }

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1])
        }

        return formData;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submit")
        let response;
        setLoading(true);
        try {
            const formData = handleFormData();

            switch (props.type) {
                case "add":
                    response = await API_Client.addNewProduct(formData);
                    break;
                case "edit":
                    response = await API_Client.updateProduct(formData);
                    break;
                case "massEdit":
                    response = await API_Client.updateManyProducts(formData);
                    break;
                default:
                    throw new Error(`props.type error: ${props.type} is not a valid type for a product form`)
            }

            if (!response.success) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (err) {
            console.error('Error:', err);
            response = { success: false, error: response?.error ?? err.message };
        }
        handleToastOpen(response, formSuccessMessage);
        setLoading(false);
    }

    /** GETTERS */

    const getTags = async () => {
        await API_Client.getProductTags().then((data)=>{setCurrentTags(data)});
    }

    /** EFFECTS */

    useEffect(()=>{
        getTags();
    }, []);

    useEffect(() => {
        if (descriptionRef.current) {
            const height = descriptionRef.current.scrollHeight;
            descriptionRef.current.style.height = `${height+2}px`;
        }
    }, [productData.description]);

    useEffect(()=>{
        setPortfolioOptions(productData.tags.filter(tag => tag.startsWith(import.meta.env.VITE_PORTFOLIO_TAG_PREFIX)))
    }, [productData.tags])
        
    return (
        <>
            <div>
                <h1>{props.data?.title ?? "Add Product"}</h1>
                <hr></hr>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Title</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    aria-label="Title"
                                    value={productData.title}
                                    onChange={handleProductData}
                                    isValid={formValidity.touched.title && !formValidity.errors.title}
                                    isInvalid={formValidity.touched.title && formValidity.errors.title}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    title is required
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Col md="4" />
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Price</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>$</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    name="price"
                                    placeholder="0.00"
                                    aria-label="Price"
                                    value={productData.price}
                                    onChange={handleProductData}
                                    onBlur={handleFormatPrice}
                                    isValid={formValidity.touched.price && !formValidity.errors.price}
                                    isInvalid={formValidity.touched.price && formValidity.errors.price}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    price is required and must be a numer
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} >
                            <Form.Label>Description</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    ref={descriptionRef}
                                    as="textarea"
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    aria-label="Description"
                                    value={productData.description}
                                    onChange={handleProductData}
                                    isValid={formValidity.touched.description && !formValidity.errors.description}
                                    isInvalid={formValidity.touched.description && formValidity.errors.description}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    description is required
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <TagForm
                            title="Category / Portfolio"
                            type="radio"
                            onChange={handleTags}
                            tagsData={currentTags}
                            defaultCheckedTags={props.data?.tags}
                            filter={import.meta.env.VITE_PORTFOLIO_TAG_PREFIX}
                            filterIn
                        />
                    </Row>
                    <Row className="mb-3">
                        <TagForm
                            onChange={handleTags}
                            tagsData={currentTags}
                            defaultCheckedTags={props.data?.tags}
                            filter={import.meta.env.VITE_PORTFOLIO_TAG_PREFIX}
                        />
                    </Row>
                    <Row className="mb-3">
                        <NewTagForm handleTags={handleNewTag} tagsData={currentTags} />
                    </Row>
                    {
                        props.type != "massEdit" ? 
                                <Row>
                                    <Form.Group className="position-relative mb-3">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept='image/*'
                                            required
                                            name="image"
                                            onChange={handleProductData}
                                            isValid={formValidity.touched.image && !formValidity.errors.image}
                                            isInvalid={formValidity.touched.image && formValidity.errors.image}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            file is required
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <ProductImage 
                                        src={productData.image ? URL.createObjectURL(productData.image) : props.data ? props.data.image_url : img_placeholder}
                                        thumbnail
                                    />
                                </Row>
                            : <></>
                    }
                    <Row>
                        <Col>
                            <Button disabled={loading} type="submit">{!loading ? "Submit" : "Submitting..."}</Button>
                        </Col>
                        {
                            (props.type != "add" && props.type != "massEdit") ?
                                    <Col className="d-flex">
                                        <Button className="ms-auto" disabled={loading} variant="danger" onClick={handleDeleteProduct}>Delete</Button>
                                    </Col>
                                : <></>
                        }
                    </Row>
                </Form>
            </div>

            <ResultToast
                show={showResToast}
                onClose={handleToastClose}
                success={formResult.success}
                title="Product"
                message={formResult.success ? formSuccessMessage : formResult.error}
            />
        </>
    )
};

export default ProductForm;
