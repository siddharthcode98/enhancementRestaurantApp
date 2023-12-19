import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'
import CartContext from '../../context/CartContext'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <header>
          <div className="nav-container">
            <nav className="nav-bar">
              <Link to="/" style={{textDecoration: 'none'}}>
                <h1 className="restaurant-name">UNI Resto Cafe</h1>
              </Link>

              <div className="my-order-container">
                <button
                  type="button"
                  className="logout-button"
                  onClick={() => {
                    onClickLogout()
                  }}
                >
                  Logout
                </button>
                <p>My Orders</p>
                <Link to="/cart" style={{textDecoration: 'none'}}>
                  <button type="button" aria-label="link">
                    <AiOutlineShoppingCart className="cart-icon" />
                  </button>
                </Link>
                <p className="cart-number">{cartList.length}</p>
              </div>
            </nav>
          </div>
        </header>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)

// import { Link, withRouter } from "react-router-dom";

// import Cookies from "js-cookie";
// import { AiOutlineShoppingCart } from "react-icons/ai";

// import "./index.css";
// import CartContext from "../../context/CartContext";

// const Header = (props) => (
//   <CartContext.Consumer>
//     {(value) => {
//       const { cartItems } = value;
//       const onClickLogout = () => {
//         const { history } = props;
//         Cookies.remove("jwtToken");
//         history.replace("/login");
//       };
//       return (
//         <header>
//           <div className="nav-container">
//             <nav className="nav-bar">
//               <Link to="/" style={{ textDecoration: "none" }}>
//                 <h1 className="restaurant-name">UNI Resto Cafe</h1>
//               </Link>

//               <div className="my-order-container">
//                 <button
//                   type="button"
//                   className="logout-button"
//                   onClick={() => {
//                     onClickLogout();
//                   }}
//                 >
//                   logout
//                 </button>
//                 <p>My Orders</p>
//                 <Link to="/cart" style={{ textDecoration: "none" }}>
//                   <AiOutlineShoppingCart className="cart-icon" />
//                 </Link>
//                 <p className="cart-number">{cartItems.length}</p>
//               </div>
//             </nav>
//           </div>
//         </header>
//       );
//     }}
//   </CartContext.Consumer>
// );

// export default withRouter(Header);
