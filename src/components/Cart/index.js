import CartContext from '../../context/CartContext'

import Header from '../Header'

import CartItem from '../CartItem'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const isEmpty = cartList.length === 0
      // console.log(cartItems);

      return (
        <>
          <Header />
          {isEmpty ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="empty"
            />
          ) : (
            <section className="food-section">
              <ul className="cart-list">
                {cartList.map(item => (
                  <CartItem key={item.dishId} dishes={item} />
                ))}
              </ul>
              <button
                type="button"
                className="removeAllBtn"
                onClick={() => {
                  removeAllCartItems()
                }}
              >
                Remove All
              </button>
            </section>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
