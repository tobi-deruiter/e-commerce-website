import React from "react"
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from'styled-components';
import computer_logo from './Assets/hero-logo.png';
import { Link } from "react-router-dom";
import ThemeButton from "./Pieces/ThemeButton";

const HeroContainer = styled(Container)`
    margin: 0;
    width: 100%;
    background-image: linear-gradient(to bottom, ${props => props.theme.primary} 5%, ${props => props.theme.white} 80%)
`

const TitleCol = styled(Col)`
    display: block;
    margin: 5rem auto 5rem 5rem;
    justify-content: center;
    align-items: center;
`

const Smallh1 = styled.h1`
    font-size: 25pt;
`

const Bigh1 = styled.h1`
    font-size: 50pt;
    margin-bottom: 1rem;
    @media(min-width: 750px) {
        max-width: 500px;
    }
`

const ImageCol = styled(Col)`
    margin: auto;
    justify-content: center;
    @media(max-width: 750px) {
        display: none;
    }
`
    
const Hero = (props) => {
  return (
    <HeroContainer fluid>
        <Row>
            <TitleCol>
                <Smallh1>Wow look at</Smallh1>
                <Bigh1>THIS AWESOME WEBSITE</Bigh1>
                <ThemeButton as={Link} to="/shop">Visit the Shop!</ThemeButton>
            </TitleCol>
            <ImageCol>
                <Image fluid src={computer_logo} />
            </ImageCol>
        </Row>
    </HeroContainer>
  )
};

export default Hero;
