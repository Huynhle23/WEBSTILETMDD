import React from 'react';
import './App.css';


import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import OutStore from './pages/OutStore';
import Blogs from './pages/Blogs';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassWord from './pages/ForgotPassWord';
import Resetpassword from './pages/Resetpassword';
import SingleBlog from './pages/SingleBlog';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import ShippingPolicy from './pages/ShippingPolicy';
import TermAndconditions from './pages/TermAndconditions';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { PrivateRoutes } from './routing/PrivateRoutes';
import { OpenRoutes } from './routing/OpenRoutes';
import Order from './pages/Order';
import CheckOutSuccess from './pages/CheckOutSuccess';
import ItemsSearch from './pages/ItemsSearch';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='login' element={ <OpenRoutes><Login/></OpenRoutes>} />
            <Route path='signup' element={  <OpenRoutes><Signup/></OpenRoutes>} />
          <Route path='/' element={<Layout/> }>
            {/* được gọi là outlet */}
            <Route index element={<Home/>}/>
            <Route path='search' element={<ItemsSearch/>}/>
            <Route path='about' element={<About/>} />
            <Route path='contact' element={<Contact/>} />
            <Route path='product' element={<OutStore/>} />
            <Route path='product/:id' element={<SingleProduct/>} />
            <Route path='blogs' element={<Blogs/>} />
            <Route path='blog/:id' element={<SingleBlog/>} />
            <Route path='cart' element={<PrivateRoutes><Cart/></PrivateRoutes>} />
            <Route path='myorders' element={<PrivateRoutes><Order/></PrivateRoutes>} />
            <Route path='compare-product' element={<CompareProduct/>} />
            <Route path='wishlist' element={<PrivateRoutes><Wishlist/></PrivateRoutes>} />
            <Route path='checkoutsuccess' element={<PrivateRoutes><CheckOutSuccess/></PrivateRoutes>} />
            
            <Route path='checkout' element={<PrivateRoutes><Checkout/></PrivateRoutes>} />
            <Route path='forgot-password' element={<ForgotPassWord/>} />
            <Route path='reset-password' element={<Resetpassword/>} />
            <Route path='privacy-policy' element={<PrivacyPolicy/>} />
            <Route path='refund-policy' element={<RefundPolicy/>} />
            <Route path='shipping-policy' element={<ShippingPolicy/>} />
            <Route path='term-conditions' element={<TermAndconditions/>} />
          </Route>
          {/* outlet end */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
