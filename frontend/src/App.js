import './App.css';
import NAV_BAR from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Portfolio from './Pages/Portfolio';
import About from './Pages/About';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';

function App() {
  return (
    <div>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
