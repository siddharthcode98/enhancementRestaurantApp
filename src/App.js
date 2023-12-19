import {Component} from 'react'

import {Switch, Route} from 'react-router-dom'

import FoodList from './components/FoodList'

import LoginPath from './components/LoginPath'

import CartContext from './context/CartContext'

import ProtectedRoute from './components/ProtectedRoute'

import Cart from './components/Cart'

class App extends Component {
  state = {cartList: []}

  addCartItem = dish => {
    const {cartList} = this.state

    const product = cartList.find(item => item.dishId === dish.dishId)
    console.log(product)
    if (!product) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, dish],
      }))
    } else {
      this.incrementCartItemQuantity(dish)
    }
  }

  removeCartItem = dish => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.dishId !== dish.dishId),
    }))
  }

  incrementCartItemQuantity = dish => {
    const {cartList} = this.state

    const product = cartList.find(item => item.dishId === dish.dishId)
    console.log(product)
    if (!product) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, dish],
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.dishId === product.dishId) {
            return {...item, count: item.count + 1}
          }
          return item
        }),
      }))
    }
  }

  decrementCartItemQuantity = dish => {
    const {cartList} = this.state
    const product = cartList.find(item => item.dishId === dish.dishId)
    if (product.count >= 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(item => {
          if (item.dishId === product.dishId) {
            return {...item, count: item.count - 1}
          }
          return item
        }),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(
          item => item.dishId !== product.dishId,
        ),
      }))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginPath} />
          <ProtectedRoute exact path="/" component={FoodList} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App

// import { Component } from "react";

// import Header from "./components/Header";

// import FoodList from "./components/FoodList";

// import CartContext from "./context/CartContext.js";

// class App extends Component {
//   state = { cart_items: 0 };
//   Increase_cart_items = () => {
//     this.setState((prevState) => ({
//       cart_items: prevState.cart_items + 1,
//     }));
//   };
//   Decrease_cart_items = () => {
//     const { cart_items } = this.state;
//     this.setState((prevState) => {
//       if (cart_items !== 0) {
//         return { cart_items: prevState.cart_items - 1 };
//       }
//     });
//   };
//   render() {
//     const { cart_items } = this.state;
//     return (
//       <CartContext.Provider
//         value={{
//           cart_items,
//           Increase_cart_items: this.Increase_cart_items,
//           Decrease_cart_items: this.Decrease_cart_items,
//         }}
//       >
//         <>
//           <Header />
//           <FoodList />
//         </>
//       </CartContext.Provider>
//     );
//   }
// }

// export default App;
