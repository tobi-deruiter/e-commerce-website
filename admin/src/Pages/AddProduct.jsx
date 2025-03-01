import React, { useState } from "react"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from "styled-components";

const FormContainer = styled.div`
    padding: 4rem;
`

const AddProduct = (props) => {
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: 0,
        tags: [],
    });
    const [image, setImage] = useState(false);

    const handleProductData = (e) => {
        formik.handleChange(e);
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

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
            // e.preventDefault();;
            const formData = new FormData();
            for (var key in productData) {
                formData.append(key, productData[key]);
            }
            formData.append('file', image);
            for (var key of formData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }
    
            try {
                const response = await fetch('http://localhost:4000/products/upload', {
                    method: 'POST',
                    headers: {
                        Accept: 'applicatoin/json',
                    },
                    body: formData,
                }).then((res)=>res.json());
    
                if (!response.success) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                console.log('Success:', response);
                // Handle success (e.g., show a success message, redirect)
            } catch (error) {
                console.error('Error:', error);
                // Handle error (e.g., show an error message)
            }
        }
    });
        
    return (
        <FormContainer>
            <h1>Add Product</h1>
            <hr></hr>
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Row className="mb-3">
                    <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik101"
                        className="position-relative"
                    >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={formik.values.title}
                            onChange={handleProductData}
                            isValid={formik.touched.title && !formik.errors.title}
                            isInvalid={formik.touched.title && !!formik.errors.title}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {formik.errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Col md="4" />
                    <Form.Group
                        as={Col}
                        md="4"
                        controlId="validationFormik101"
                        className="position-relative"
                    >
                        <Form.Label>Price</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="price"
                                placeholder="0.00"
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
                    <Form.Group
                        as={Col}
                        controlId="validationFormik102"
                        className="position-relative"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={formik.values.description}
                            onChange={handleProductData}
                            isValid={formik.touched.description && !formik.errors.description}
                            isInvalid={formik.touched.description && !!formik.errors.description}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                            {formik.errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Form.Group className="position-relative mb-3">
                    <Form.Label>File</Form.Label>
                    <Form.Control
                        type="file"
                        required
                        name="file"
                        onChange={handleImage}
                        isValid={formik.touched.file && image}
                        isInvalid={formik.touched.file && !image}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                        {formik.errors.file}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
        </FormContainer>
    )
};

export default AddProduct;
