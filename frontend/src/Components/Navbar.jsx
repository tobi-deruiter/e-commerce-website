import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import styled from'styled-components';
import main_logo from "./Assets/main-logo.png";

const StyledNav = styled(Navbar)`
    color: ${props => props.theme.black};
    background-color: ${props => props.theme.white};
`;

const NavImage = styled(Image)`
    max-width: 50px;
`

const EndNavCollapse = styled(StyledNav.Collapse)`
    justify-content: end;
`;

const NAV_BAR = () => {
    return (
        <StyledNav expand="lg">
            <Container>
                <Link as={Link} to="/" ><NavImage src={main_logo} /></Link>
                <StyledNav.Brand as={Link} to="/">E-Commerce Website</StyledNav.Brand>
                <StyledNav.Toggle aria-controls="basic-navbar-nav" />
                <EndNavCollapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                        <NavDropdown title="Portfolios" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="portfolio-first">First Portfolio</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="portfolio-second">Second Portfolio</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </Nav>
                </EndNavCollapse>
            </Container>
        </StyledNav>
    )
};

export default NAV_BAR;
