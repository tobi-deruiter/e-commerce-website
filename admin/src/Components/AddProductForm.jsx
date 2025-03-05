import React, { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from "styled-components";
import ProductTagsSwitches from "./Forms/ProductTagsSwitches";
import NewTagForm from "./Forms/NewTagForm";
import API_Client from "../api/api.client";

const FormContainer = styled.div`
    padding: 4rem;
    max-width: 1000px;
`

const AddProductForm = (props) => {
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: 0,
    });
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentTags, setCurrentTags] = useState([]);

    const getTags = async () => {
        await API_Client.getProductTags().then((data)=>{setCurrentTags(data)});
    }

    useEffect(()=>{
        getTags();
    }, []);

    const handleProductData = (e) => {
        formik.handleChange(e);
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

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

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            price: '',
            tags: [],
            file: null,
        },
        validationSchema: yup.object().shape({
            title: yup.string().required(),
            description: yup.string().required(),
            price: yup.number().required(),
            tags: yup.array().required(),
            file: yup.mixed().required(),
        }),
        onSubmit: async (e) => {
            setLoading(true);

            const formData = new FormData();
            for (const key in productData) {
                formData.append(key, productData[key]);
            }
            for (const key in tags) {
                formData.append('tags[]', tags[key]);
            }
            formData.append('file', image);
    
            try {
                const response = await API_Client.addNewProduct(formData);
    
                if (!response.success) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                console.log('Success:', response);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
            }
        }
    });
        
    return (
        <FormContainer>
            <h1>Add Product</h1>
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
                                isInvalid={formik.touched.title && !!formik.errors.title}
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
                                isInvalid={formik.touched.price && !!formik.errors.price}
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
                                as="textarea"
                                type="text"
                                name="description"
                                placeholder="Description"
                                aria-label="Description"
                                value={formik.values.description}
                                onChange={handleProductData}
                                isValid={formik.touched.description && !formik.errors.description}
                                isInvalid={formik.touched.description && !!formik.errors.description}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                                {formik.errors.description}
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>
                <Row className="mb-3">
                    <ProductTagsSwitches onChange={handleTags} tagsData={currentTags} />
                </Row>
                <Row className="mb-3">
                    <NewTagForm handleTags={handleNewTag} tagsData={currentTags} />
                </Row>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                        type="file"
                        accept='image/*'
                        required
                        name="file"
                        aria-label="File"
                        onChange={handleImage}
                        isValid={formik.touched.file && image}
                        isInvalid={formik.touched.file && !image}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.file}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button disabled={loading} type="submit">{!loading ? "Submit" : "Submitting..."}</Button>
            </Form>
        </FormContainer>
    )
};

export default AddProductForm;
