import React, { useState } from "react"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import styled from'styled-components';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import NavLinks from "./NavLinks";

const StyledNavbar = styled(Navbar)`
    height: ${props => props.theme.navbarHeight}px;
    box-shadow: 0px -1px 7px rgba(0,0,0,1);
    background-color: white;
`

const NavImage = styled(Image)`
    max-width: 50px;
`

const OffCanvasNavbar = styled(Navbar.Offcanvas)`
    @media (min-width: 1199.8px) {
        display: none;
    }
`

const NAV_BAR = (props) => {
    const [expanded, setExpanded] = useState(false);

    const handleClose = () => setExpanded(false);
    const handleOpen = () => setExpanded(true);

    return (
        <>
            <StyledNavbar expand="xl" fixed="top" expanded={expanded}>
                <Container>
                    <Link as={Link} to="/" ><NavImage src="https://res.cloudinary.com/dbjagmj0q/image/upload/v1740521536/mzhrisf2mnu8mkvehy2j.png" /></Link>
                    <Navbar.Brand as={Link} to="/" className="me-auto">E-Commerce Website</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar`} onClick={handleOpen} />
                    <OffCanvasNavbar
                        id={`offcanvasNavbar`}
                        placement="start"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel`}>
                                Menu
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className="d-block">
                            <Nav>
                                <NavLinks handleClose={handleClose} />
                            </Nav>
                        </Offcanvas.Body>
                    </OffCanvasNavbar>
                </Container>
            </StyledNavbar>
            
        </>
    )
};

export default NAV_BAR;
