import React from "react"
import Form from 'react-bootstrap/Form';
import CloseButton from 'react-bootstrap/CloseButton';
import InputGroup from 'react-bootstrap/InputGroup';
import styled from "styled-components";

const StyledInputGroup = styled(InputGroup)`
    width: fit-content;
`

const StyledFormControl = styled(Form.Control)`
    width: fit-content;
`

const NewTag = (props) => {
    return (
        <StyledInputGroup>
            <StyledFormControl
                disabled
                value={props.value}
            />
            <StyledInputGroup.Text><CloseButton value={props.value} onClick={props.onRemoveNewTag} /></StyledInputGroup.Text>
        </StyledInputGroup>
    )
};

export default NewTag;
