import {createContext} from 'react'

const CartContext = createContext({
  cartList: [],
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  addCartItem: () => {},
  removeAllCartItems: () => {},
  removeCartItem: () => {},
})

export default CartContext
