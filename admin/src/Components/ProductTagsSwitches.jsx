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

const ProductTagsSwitches = (props) => {
    return (
        <Form.Group as={Col} >
            <Form.Label>Tags</Form.Label>
            <TagSwitchesContainer>
                {
                    props.tagsData ? 
                        props.tagsData.success ?
                            props.tagsData.tags.map((item, i) => {
                                if (item != "")
                                    return <FormControl as={Form.Check} key={i} type="switch" name="tags" label={item} value={item} onChange={props.onChange} />
                            }) :
                            <p>{props.tagsData.error}</p>
                        :
                        <h6>Retrieving tags...</h6>
                }
            </TagSwitchesContainer>
        </Form.Group>
    )
};

export default ProductTagsSwitches;
