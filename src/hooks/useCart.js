import { useContext } from 'react';

import CartContext from '../contexts/cart';

const useCart = () => {
  const { cart, setCart } = useContext(CartContext);

  const updateCart = (cart) => {
    setCart(cart);
  };

  return { cart, updateCart };
};

export default useCart;
