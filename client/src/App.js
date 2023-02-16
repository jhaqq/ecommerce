import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { CartMenu, Checkout, Confirmation, Home, ItemDetails, Navbar, Footer, SearchMenu } from './scenes'
import Auth from './scenes/Authentication/Auth';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0,0)

  }, [pathname])
  
  return null;
}

const App = () => {
  return (
    <div className='app'>
      <BrowserRouter>
      <Navbar />
      <SearchMenu />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='item/:itemid' element={<ItemDetails />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='checkout/success' element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
