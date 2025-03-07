import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DefaultTagsForm from "./DefaultTagsForm";
import styled from "styled-components";
import API_Client from "../../api/apiClient";

const FormContainer = styled.div`
    padding: 4rem;

    @media (max-width: 1199.8px) {
        padding: 1.5rem 0.5rem;
    }
`

const SettingsForm = (props) => {
    const [loading, setLoading] = useState(false);
    const [defaultTags, setDefaultTags] = useState([]);

    const handleDefaultTags = (newTag) => {
        let changedTags = defaultTags;
        if (defaultTags.indexOf(newTag) === -1 && newTag != "" && newTag != import.meta.env.VITE_PORTFOLIO_TAG_PREFIX) {
            changedTags.push(newTag)
            setDefaultTags(changedTags);
        } else {
            setDefaultTags(changedTags.filter(tag => tag != newTag));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response;
        try {
            response = await API_Client.updateDefaultSettingsProduct({ tags: defaultTags });
            console.log(response);
        } catch (err) {
            console.log("Response:", response);
            console.log("Error:", err);
            alert(err);
        }
        setLoading(false);
    }

    return (
        <FormContainer>
            <h1>Settings</h1>
            <hr></hr>
            <br />
            <Form noValidate onSubmit={handleSubmit}>
                <DefaultTagsForm handleDefaultTags={handleDefaultTags} />
                <br />
                <Button disabled={loading} type="submit">{loading ? "Saving..." : "Save"}</Button>
            </Form>
        </FormContainer>
    )
};

export default SettingsForm;
