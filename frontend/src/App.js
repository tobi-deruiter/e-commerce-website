import './App.css';
import NAV_BAR from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Portfolio from './Pages/Portfolio';
import About from './Pages/About';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import Footer from './Components/Footer';

const theme = {
  primary: "#80cfa9",
  primary_dark: "#2C6E49",
  secondary: "#DBD2E0",
  secondary_dark: "#9B82A8",
  tertiary: "#4A848A",
  tertiary_dark: "#093A3E",
  black: "#001011",
  white: "#FCF7FF",
};

const GlobalTheme = styled.div`
  color: ${props => props.theme.black};
  background-color: ${props => props.theme.white};
`

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalTheme>
        <BrowserRouter>
          <NAV_BAR/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/portfolio-first' element={<Portfolio portfolio="first"/>}/>
            <Route path='/portfolio-second' element={<Portfolio portfolio="second"/>}>
              <Route path=':productId' element={<Shop/>}/>
            </Route>
            <Route path='/about' element={<About/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<LoginSignup/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </GlobalTheme>
    </ThemeProvider>
  );
}

export default App;
