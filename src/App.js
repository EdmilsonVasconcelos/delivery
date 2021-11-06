import React, { useState } from 'react';

import TokenContext from './contexts/token';
import CartContext from './contexts/cart';
import PrepareToCartContext from './contexts/prepareToCart';
import Routes from './routes';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('vscdelivery'));

  const [prepareToCart, setPrepareToCart] = useState({
    product: { quantity: 1, id: 0 },
    address: { street: '', number: '', neighborhood: '' },
    phoneNumber: '',
    payment: 'IN_CASH',
  });

  const [cart, setCart] = useState();

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <CartContext.Provider value={{ cart, setCart }}>
        <PrepareToCartContext.Provider
          value={{ prepareToCart, setPrepareToCart }}
        >
          <Routes />
        </PrepareToCartContext.Provider>
      </CartContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
