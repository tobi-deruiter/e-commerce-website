import React from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from 'react-bootstrap/Image';
import styled from'styled-components';
import main_logo from "./Assets/main-logo.png"
import { Link } from "react-router-dom";

const FooterContainer = styled(Container)`
    margin-top: 10rem;
`

const FooterCol = styled(Col)`
    display: flex;
    justify-content: center;
`

const FooterLogo = styled(Image)`
    max-width: 50px;
`

const FooterTitle = styled.h1`
    font-size: 30pt;
`

const FooterList = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 2rem;
`

const FooterLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.black};
`

const Copyright = styled.p`
    font-size: 12pt;
    text-align: center;
`

const Footer = (props) => {
    return (
        <FooterContainer>
            <Row>
                <FooterCol>
                    <FooterLogo src={main_logo} />
                    <FooterTitle>E-Commerce Website</FooterTitle>
                </FooterCol>
            </Row>
            <Row>
                <FooterCol>
                    <FooterList>
                        <li><FooterLink to="/shop">Products</FooterLink></li>
                        <li><FooterLink to="/portfolio-first">First Portfolio</FooterLink></li>
                        <li><FooterLink to="/portfolio-second">Second Portfolio</FooterLink></li>
                        <li><FooterLink to="/about">About</FooterLink></li>
                    </FooterList>
                </FooterCol>
            </Row>
            <hr />
            <Row>
                <Copyright>Copyright @ 2025 - All Rights Reserved</Copyright>
            </Row>
        </FooterContainer>
    )
};

export default Footer;
