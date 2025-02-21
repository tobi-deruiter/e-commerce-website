import React from "react"
import Card from 'react-bootstrap/Card';
import styled from "styled-components";
import ThemeButton from "./Pieces/ThemeButton";

const StyledCard = styled(Card)`
    width: 18rem;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.black};
`

const Item = (props) => {
    return (
        <StyledCard>
            <StyledCard.Img variant="top" src={props.image} />
            <StyledCard.Body>
                <StyledCard.Title>{props.title}</StyledCard.Title>
                <StyledCard.Text>{props.description}</StyledCard.Text>
                <ThemeButton variant="primary">Product details...</ThemeButton>
            </StyledCard.Body>
        </StyledCard>
    )
};

export default Item;
