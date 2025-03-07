import React, { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import styled from "styled-components";

const TagSwitchesContainer = styled(InputGroup)`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
`

const FormControl = styled(Form.Control)`
    border: none;
    width: fit-content;
`

const TagForm = (props) => {
    const filter = (item) => {
        const res = item.startsWith(props.filter ?? "");
        return props.filterIn ? res : !res;
    };

    return (
        <Form.Group as={Col} >
            <Form.Label>{props.title ?? "Tags"}</Form.Label>
            <TagSwitchesContainer>
                {
                    props.tagsData ? 
                        props.tagsData.success ?
                            props.tagsData.tags.map((item, i) => {
                                if (item != "" && filter(item))
                                    return <FormControl
                                        as={Form.Check}
                                        key={i}
                                        type={props.type ?? "switch"}
                                        name="tags"
                                        aria-label="tag"
                                        label={(props.filterIn && item.startsWith(props.filter)) ? item.substring(props.filter.length) : item}
                                        value={item}
                                        onChange={props.onChange}
                                        defaultChecked={!!props.defaultCheckedTags?.includes(item)}
                                    />
                            }) :
                            <p>{props.tagsData.error}</p>
                        :
                        <h6>Retrieving tags...</h6>
                }
            </TagSwitchesContainer>
        </Form.Group>
    )
};

export default TagForm;
