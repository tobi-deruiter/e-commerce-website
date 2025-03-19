import React from "react"
import styled from'styled-components';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import NavLinks from "./NavLinks";

const SideNav = styled(Nav)`
    position: fixed;
    top: ${props => props.theme.navbarHeight}px;
    bottom: 0;
    left: 0;
    padding: 2rem;
    margin-left: -1rem;
    width: 207px;
    min-width: 207px;
    min-height: calc(100vh - ${props => props.theme.navbarHeight}px) !important;
    z-index: 100;
    box-shadow: inset -1px 0 0 rgba(0,0,0, 0.1);
    background-color: white;

    @media (max-width: 1199.8px) {
        display: none;
    }
`

const Sidebar = (props) => {
    return (
        <SideNav className="col-md-12">
            <NavLinks />
        </SideNav>
    )
};

export default Sidebar;
