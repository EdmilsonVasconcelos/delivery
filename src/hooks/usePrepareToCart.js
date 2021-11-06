import { useContext } from 'react';

import PrepareToCartContext from '../contexts/prepareToCart';

const usePrepareToCart = () => {
  const { prepareToCart, setPrepareToCart } = useContext(PrepareToCartContext);

  const updatePrepareToCart = (cart) => {
    setPrepareToCart(cart);
  };

  return { prepareToCart, updatePrepareToCart };
};

export default usePrepareToCart;
