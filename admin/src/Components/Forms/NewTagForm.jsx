import React, { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import NewTag from "../NewTag";
import InputGroup from 'react-bootstrap/InputGroup';
import styled from "styled-components";
import Button from 'react-bootstrap/Button';

const NewTagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`

const NewTagForm = (props) => {
    const [newTag, setNewTag] = useState('');
    const [newTags, setNewTags] = useState([]);
    const [newTagError, setNewTagError] = useState(false);
    const [effectTrigger, setEffectTrigger] = useState(false);

    const handleNewTag = (e) => {
        setNewTag(e.target.value);
        setNewTagError(false);
    }

    const handleRemoveNewTag = (e) => {
        let changedTags = newTags;
        const _tag = props.isPortfolioForm ? `${import.meta.env.VITE_PORTFOLIO_TAG_PREFIX}${e.target.value}` : e.target.value;
        setNewTags(changedTags.filter(tag => tag != _tag));
        props.handleTags(_tag);
    }

    const handleTabKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            triggerEffect();
        }
    }

    const triggerEffect = () => {
        setEffectTrigger(!effectTrigger);
    }

    useEffect(() => {
        if (props.defaultTags) {
            const tags = props.isPortfolioForm ?
                    props.defaultTags.filter(tag => tag.startsWith(import.meta.env.VITE_PORTFOLIO_TAG_PREFIX))
                :
                    props.defaultTags.filter(tag => !tag.startsWith(import.meta.env.VITE_PORTFOLIO_TAG_PREFIX))
            setNewTags(tags);
        }
    }, [props.defaultTags]);

    useEffect(() => {
        const _tag = props.isPortfolioForm ? `${import.meta.env.VITE_PORTFOLIO_TAG_PREFIX}${newTag}` : newTag;
        if (_tag !== "" && newTags.indexOf(_tag) === -1 && props.tagsData.tags?.indexOf(_tag) === -1) {
            let changedTags = newTags;
            changedTags.push(_tag);
            setNewTags(changedTags);
            props.handleTags(_tag);
            setNewTag('');
            setNewTagError(false);
        } else if (newTag.length !== 0) {
            setNewTagError(true);
        }
    }, [effectTrigger]);

    const mapNewTags = (item, i) => {
        return <NewTag
            key={i}
            label={item}
            value={props.isPortfolioForm ? item.substring(11) : item}
            onRemoveNewTag={handleRemoveNewTag}
        />
    }

    return (
        <>
            <NewTagsContainer>
                {
                    newTags && newTags.length > 0 ?
                        newTags.map((item, i) => mapNewTags(item, i))
                        : <p className="text-muted">There are no new {props.isPortfolioForm ? "categories/portfolios" : "tags"} currently set.</p>
                }
            </NewTagsContainer>
            <Form.Group as={Col} md="4" className="mt-3" >
                <Form.Label>{props.isPortfolioForm ? "Add New Category/Portfolio" : "Add New Tag"}</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        name="new_tag"
                        placeholder={props.isPortfolioForm ? "New Category/Portfolio" : "New Tag"}
                        aria-label="New Tag"
                        value={newTag}
                        onChange={handleNewTag}
                        onKeyDown={handleTabKeyDown}
                        isInvalid={newTagError && newTag !== ''}
                    />
                    <InputGroup.Text as={Button} onClick={triggerEffect}>Add</InputGroup.Text>
                    <Form.Control.Feedback type="invalid" tooltip>
                        this new {props.isPortfolioForm ? "category/portfolio" : "tag"} is either empty or already exists
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        </>
    )
};

export default NewTagForm;
