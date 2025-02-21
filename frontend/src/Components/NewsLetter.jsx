import React from "react"
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import ThemeButton from "./Pieces/ThemeButton";

const NewsLetterContainer = styled(Container)`
    margin: 0;
    width: 100%;
    padding: 2rem 5rem;
    text-align: center;
    background-image: linear-gradient(to bottom, ${props => props.theme.primary} 5%, ${props => props.theme.white} 80%)
`

const Title = styled.h1`
    font-size: 40pt;
`

const SubTitle = styled.h1`
    font-size: 17pt;
`

const EmailForm = styled(Form)`
    max-width: 500px;
    margin: 0 auto;
`

const NewsLetter = (props) => {
    return (
        <NewsLetterContainer fluid>
            <Title>Get Exclusive Offers!</Title>
            <SubTitle>Subscribe to our newletter and stay updated</SubTitle>
            <EmailForm className="d-flex">
                <EmailForm.Control
                    type="email"
                    placeholder="john.doe@email.com"
                />
                <ThemeButton>Submit</ThemeButton>
            </EmailForm>
        </NewsLetterContainer>
    )
};

export default NewsLetter;
