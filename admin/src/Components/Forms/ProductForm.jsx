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
        description: props.data?.description ?? '',
        price: props.data?.price ?? 0,
    });
    const [tags, setTags] = useState(props.data?.tags ?? []);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentTags, setCurrentTags] = useState([]);
    const [portfolioOptions, setPortfolioOptions] = useState([]);
    const [showResToast, setShowResToast] = useState(false);
    const [formResult, setFormResult] = useState({ success: false});
    const [formSuccessMessage, setFormSuccessMessage] = useState("You have successfully saved this product.");

    const formik = useFormik({
        initialValues: {
            title: props.data?.title ?? '',
            description: props.data?.description ?? '',
            price: props.data?.price ?? '',
            file: props.data?.image_url ?? null,
        },
        validationSchema: yup.object().shape({
            title: yup.string(),
            description: yup.string(),
            price: yup.number(),
            file: yup.mixed(),
        }),
        onSubmit: async (e) => {
            console.log("submit")
            let response;
            setLoading(true);
            try {
                if (props.type != "massEdit" && !portfolioOptions.some(option => tags.includes(option))) {
                    throw new Error("You must choose a portfolio!")
                }

                const formData = new FormData();
                if (props.type == "massEdit")
                    for (const i in props.selectedProducts)
                        formData.append('product_ids[]', props.selectedProducts[i])
                (props.data && props.type != "massEdit") && formData.append('product_id', props.data._id);
                for (const i in productData) {
                    formData.append(i, productData[i]);
                }
                for (const i in tags) {
                    formData.append('tags[]', tags[i]);
                }
                if (image) {
                    formData.append('file', image);
                } else if (!props.data) {
                    throw new Error("You must choose a product image!");
                }

                for (const pair of formData.entries()) {
                    console.log(pair[0], pair[1])
                }
    
                switch (props.type) {
                    case "add":
                        response = await API_Client.addNewProduct(formData);
                        break;
                    case "massEdit":
                        response = await API_Client.updateManyProducts(formData);
                        break;
                    default:
                        response = await API_Client.updateProduct(formData);
                }
    
                if (!response.success) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            } catch (err) {
                console.error('Error:', err);
                alert(err);
            }
            (response.success != undefined) && handleToastOpen(response, formSuccessMessage);
            setLoading(false);
        }
    });

    /** HANDLERS */

    const handleToastOpen = (res, message) => {
        setFormSuccessMessage(message);
        setFormResult(res);
        setShowResToast(true);
    }

    const handleToastClose = () => setShowResToast(false);

    const handleProductData = (e) => {
        formik.handleChange(e);
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    const handleTags = (e) => {
        formik.handleChange(e);
        let changedTags = tags;
        if (e.target.checked) {
            if (e.target.value.startsWith(import.meta.env.VITE_PORTFOLIO_TAG_PREFIX))
                changedTags = changedTags.filter(tag => !tag.startsWith(import.meta.env.VITE_PORTFOLIO_TAG_PREFIX))
            changedTags.push(e.target.value)
            setTags(changedTags);
        } else {
            setTags(changedTags.filter(tag => tag != e.target.value));
        }
    }

    const handleNewTag = (newTag) => {
        let changedTags = tags;
        if (tags.indexOf(newTag) === -1) {
            changedTags.push(newTag)
            setTags(changedTags);
        } else {
            setTags(changedTags.filter(tag => tag != newTag));
        }
    }

    const handleImage = (e) => {
        formik.handleChange(e);
        setImage(e.target.files[0]);
    }

    const handleDeleteProduct = async () => {
        setLoading(true);
        if (props.data && confirm(`Are you sure you would like to delete "${props.data.title}"?\n\nTHIS IS A PERMANENT ACTION`)) {
            const res = await API_Client.deleteProducts([props.data._id]);
            handleToastOpen(res, `Successfully deleted "${props.data.title}"`)
        }
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
        setPortfolioOptions(tags.filter(tag => tag.startsWith(import.meta.env.VITE_PORTFOLIO_TAG_PREFIX)))
    }, [tags])
        
    return (
        <>
            <div>
                <h1>{props.data?.title ?? "Add Product"}</h1>
                <hr></hr>
                <Form noValidate onSubmit={formik.handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="4" >
                            <Form.Label>Title</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    aria-label="Title"
                                    value={formik.values.title}
                                    onChange={handleProductData}
                                    isValid={formik.touched.title && !formik.errors.title}
                                    isInvalid={formik.touched.title && !!formik.errors.title && props.type != "massEdit"}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {formik.errors.title}
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
                                    value={formik.values.price}
                                    onChange={handleProductData}
                                    isValid={formik.touched.price && !formik.errors.price}
                                    isInvalid={formik.touched.price && !!formik.errors.price && props.type != "massEdit"}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {formik.errors.price}
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
                                    value={formik.values.description}
                                    onChange={handleProductData}
                                    isValid={formik.touched.description && !formik.errors.description}
                                    isInvalid={formik.touched.description && !!formik.errors.description && props.type != "massEdit"}
                                />
                                <Form.Control.Feedback type="invalid" tooltip>
                                    {formik.errors.description}
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
                                            name="file"
                                            aria-label="File"
                                            onChange={handleImage}
                                            isValid={formik.touched.file && image}
                                            isInvalid={formik.touched.file && !image && !props.data}
                                        />
                                        <Form.Control.Feedback type="invalid" tooltip>
                                            {formik.errors.file}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <ProductImage 
                                        src={image ? URL.createObjectURL(image) : props.data ? props.data.image_url : img_placeholder}
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
