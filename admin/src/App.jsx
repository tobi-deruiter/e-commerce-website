import React, { createContext } from "react"
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

const Settings = createContext(null);

const SideNavWrapper = styled(Col)`
    min-height: calc(100vh - ${props => props.theme.navbarHeight}px) !important;

    @media (max-width: 1199.8px) {
        display: none;
    }
`

const ContentWrapper = styled(Col)`
    margin-top: ${props => props.theme.navbarHeight}px;
`

const App = (props) => {

    const settings = {

    };

    const theme = {
        navbarHeight: 60,
    };

    return (
        <Settings.Provider value={settings}>
            <ThemeProvider theme={theme}>
                <Container fluid>
                    <BrowserRouter>
                        <Row>
                            <NAV_BAR />
                        </Row>
                        <Row>
                            <SideNavWrapper xs={2}>
                                <Sidebar />
                            </SideNavWrapper>
                            <ContentWrapper>
                                <Routes>
                                    <Route path='/' element={<Home />}/>
                                    <Route path='/addproduct' element={<AddProduct/>}/>
                                </Routes>
                            </ContentWrapper>
                        </Row>
                    </BrowserRouter>
                </Container>
            </ThemeProvider>
        </Settings.Provider>
    )
};

export default App;
