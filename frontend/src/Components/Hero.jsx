import React from "react"
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from'styled-components';
import computer_logo from '../Assets/3dicons-computer-front-color.png';
import { Link } from "react-router-dom";

const HeroContainer = styled(Container)`
    margin: 0;
    width: 100%;
    background-image: linear-gradient(to bottom, violet 5%, white 80%)
`

const TitleCol = styled(Col)`
    display: block;
    margin: 5rem auto 5rem 2rem;
`

const Smallh1 = styled.h1`
    font-size: 25pt;
`

const Bigh1 = styled.h1`
    font-size: 50pt;
    margin-bottom: 1rem;
`

const ShopButton = styled(Button)`
    background-color: blue;
    border-color: blue;
    text-decoration: none;
    padding: 0.5rem;
    border-radius: 0.75rem;
    color: white;
    &:hover {
        background-color: darkblue;
        border-color: darkblue;
    }
`

const ImageCol = styled(Col)`
    margin: auto;
    justify-content: center;
    align-items:
`
    
const Hero = (props) => {
  return (
    <HeroContainer fluid>
        <Row>
            <TitleCol>
                <Smallh1>Wow look at</Smallh1>
                <Bigh1>THIS AWESOME WEBSITE</Bigh1>
                <ShopButton as={Link} to="/shop">Visit the Shop!</ShopButton>
            </TitleCol>
            <ImageCol>
                <Image src={computer_logo} />
            </ImageCol>
        </Row>
    </HeroContainer>
  )
};

export default Hero;
