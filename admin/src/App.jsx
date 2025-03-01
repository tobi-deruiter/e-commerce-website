import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import AddProduct from "./Pages/AddProduct";
import 'bootstrap/dist/css/bootstrap.min.css';
import NAV_BAR from "./Components/Navbar";

const navbarHeight = 60;

const SideNavWrapper = styled(Col)`
    min-height: calc(100vh - ${navbarHeight}px) !important;

    @media (max-width: 992px) {
        display: none;
    }
`

const App = (props) => {
    return (
      <Container fluid>
        <BrowserRouter>
          <Row>
            <NAV_BAR height={navbarHeight} />
          </Row>
          <Row>
            <SideNavWrapper xs={2}>
              <Sidebar height={navbarHeight} />
            </SideNavWrapper>
            <Col>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/addproduct' element={<AddProduct/>}/>
              </Routes>
            </Col>
          </Row>
        </BrowserRouter>
      </Container>
    )
};

export default App;
