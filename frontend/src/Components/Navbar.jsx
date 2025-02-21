import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import styled from'styled-components';

const StyledNav = styled(Navbar)`
    
`;

const Styledhr = styled.hr`
    margin: auto 0 auto 0
`;

const StartNav = styled(Nav)`
    margin-end: auto;
`

const EndNavCollapse = styled(StyledNav.Collapse)`
    justify-content: end;
`;

const EndNav = styled(Nav)`
    margin-start: auto;
`

const NAV_BAR = () => {
    return (
        <StyledNav expand="lg">
            <Container>
                <StyledNav.Brand as={Link} to="/">E-Commerce Website<Styledhr></Styledhr></StyledNav.Brand>
                <StyledNav.Toggle aria-controls="basic-navbar-nav" />
                <StyledNav.Collapse id="basic-navbar-nav">
                    <StartNav>
                        <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                        <NavDropdown title="Portfolios" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="portfolio-first">First Portfolio</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="portfolio-second">Second Portfolio</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </StartNav>
                </StyledNav.Collapse>
                <EndNavCollapse>
                    <EndNav>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </EndNav>
                </EndNavCollapse>
            </Container>
        </StyledNav>
    )
};

export default NAV_BAR;
