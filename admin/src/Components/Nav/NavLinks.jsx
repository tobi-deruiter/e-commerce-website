import React from "react"
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import styled from'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const NavbarLink = styled(Nav.Link)`
    text-decoration: none;
    color: black;
    padding: 0.5rem;
    border-radius: 1rem;
    width: 100%;
    height: fit-content;

    &:hover {
        background-color: lightgray;
    }
`

const NavLinks = (props) => {
    const handleClick = () => {
        if (props.handleClose) props.handleClose();
    }

    return (
        <Container>
            <NavbarLink onClick={handleClick} as={Link} to="/">All Products</NavbarLink>
            <NavbarLink onClick={handleClick} as={Link} to="/addproduct">Add New Product</NavbarLink>
            <NavbarLink onClick={handleClick} as={Link} to="/portfolio-first">First Portfolio</NavbarLink>
            <NavbarLink onClick={handleClick} as={Link} to="/portfolio-second">Second Portfolio</NavbarLink>
            <NavbarLink onClick={handleClick} as={Link} to="/settings">Settings</NavbarLink>
        </Container>
    )
};

export default NavLinks;
