import React, { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import NewTag from "./NewTag";
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
    }

    const handleRemoveNewTag = (e) => {
        let changedTags = newTags;
        setNewTags(changedTags.filter(tag => tag != e.target.value));
        props.handleTags(e.target.value);
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
        if (newTag !== "" && newTags.indexOf(newTag) === -1 && props.tagsData.tags.indexOf(newTag) === -1) {
            let changedTags = newTags;
            changedTags.push(newTag);
            setNewTags(changedTags);
            props.handleTags(newTag);
            setNewTag('');
            setNewTagError(false);
        } else if (newTags.length !== 0) {
            setNewTagError(true);
        }
    }, [effectTrigger]);

    return (
        <>
            <NewTagsContainer>
                {
                    newTags ?
                        newTags.map((item, i) => {
                            return <NewTag key={i} value={item} onRemoveNewTag={handleRemoveNewTag} />
                        })
                        : <></>
                }
            </NewTagsContainer>
            <Form.Group as={Col} md="4" className="mt-3" >
                <Form.Label>Add New Tag</Form.Label>
                <InputGroup>
                    <Form.Control
                        type="text"
                        name="new_tag"
                        placeholder="New Tag"
                        aria-label="New Tag"
                        value={newTag}
                        onChange={handleNewTag}
                        onKeyDown={handleTabKeyDown}
                        isInvalid={newTagError && newTag !== ''}
                    />
                    <InputGroup.Text as={Button} onClick={triggerEffect}>Add</InputGroup.Text>
                    <Form.Control.Feedback type="invalid" tooltip>
                        this new tag is either empty or already exists
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        </>
    )
};

export default NewTagForm;
