import React from "react"
import styled from'styled-components';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

const SideNav = styled(Nav)`
    display: block;
    position: fixed;
    top: ${props => props.theme.navbarHeight}px;
    bottom: 0;
    left: 0;
    padding: 1rem;
    margin-left: -1rem;
    width: 207px;
    min-width: 207px;
    min-height: calc(100vh - ${props => props.theme.navbarHeight}px) !important;
    z-index: 100;
    box-shadow: inset -1px 0 0 rgba(0,0,0, 0.1);

    @media (max-width: 992px) {
        display: none;
    }
`

const NavbarLink = styled(SideNav.Link)`
    display: block;
    border: 1px solid rgba(0,0,0, 0.5);
    border-radius: 1rem;
    margin: 1rem;
    color: black !important;
    text-decoration: none !important;
    padding: 0.5rem;

    &:hover {
        background-color: rgba(0,0,0, 0.15)
    }
`


const Sidebar = (props) => {
    return (
        <SideNav className="col-md-12">
            <NavbarLink as={Link} to="/">All Products</NavbarLink>
            <NavbarLink as={Link} to="/addproduct">Add New Product</NavbarLink>
            <NavbarLink as={Link} to="/portfolio-first">First Portfolio</NavbarLink>
            <NavbarLink as={Link} to="/portfolio-second">Second Portfolio</NavbarLink>
        </SideNav>
    )
};

export default Sidebar;
