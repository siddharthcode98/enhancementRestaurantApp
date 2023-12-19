import {useState} from 'react'

import CartContext from '../../context/CartContext'

import './index.css'

const Dish = props => {
  const {dishes} = props
  // console.log(dishes);
  const {
    // eslint-disable-next-line
    dishId,
    addonCat,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishName,
    dishPrice,
    dishImage,
    dishAvailability,
  } = dishes

  const availability = () => {
    if (dishAvailability) {
      if (addonCat.length !== 0) {
        return 'Customizations available'
      }
      return ''
    }
    return 'Not Available'
  }

  const customization =
    addonCat.length !== 0 && dishAvailability ? 'color-blue' : 'color-red'
  const [count, setCount] = useState(0)
  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value

        const onClickIncrement = () => {
          setCount(count + 1)
        }
        const onClickDecrement = () => {
          if (count >= 1) {
            setCount(count - 1)
          }
        }
        return (
          <li className="grid-layout">
            <div className="dish-text-container">
              <h1 className="dish-name">{dishName}</h1>
              <p className="font-weight-2">
                {dishCurrency} {dishPrice}
              </p>
              <p className="dish-description">{dishDescription}</p>
              {dishAvailability && (
                <div className="button-style">
                  <button
                    type="button"
                    className="button-change"
                    onClick={onClickDecrement}
                  >
                    -
                  </button>
                  <p>{count}</p>
                  <button
                    type="button"
                    className="button-change"
                    onClick={onClickIncrement}
                  >
                    +
                  </button>
                </div>
              )}
              <p className={`${customization} text-display`}>
                {availability()}
              </p>
              {count > 0 && (
                <button
                  type="button"
                  className="addtoCart"
                  onClick={() => {
                    addCartItem({...dishes, count})
                  }}
                >
                  ADD TO CART
                </button>
              )}
            </div>

            <p className="calories">{dishCalories} calories</p>

            <div>
              <img className="food-Image" src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Dish

// import { useState } from "react";

// import CartContext from "../../context/CartContext";
// import "./index.css";

// const Dish = (props) => {
//   const { dishes } = props;
//   // console.log(dishes);
//   const {
//     addonCat,
//     dish_calories,
//     dish_currency,
//     dish_description,
//     dish_name,
//     dish_price,
//     dish_image,
//     dish_Availability,
//   } = dishes;
//   // console.log(addonCat);
//   const availability = () => {
//     if (dish_Availability) {
//       if (addonCat.length !== 0) {
//         return "Customizations available";
//       } else {
//         return "";
//       }
//     } else {
//       return "Not Available";
//     }
//   };
//   // console.log(availability);
//   // const textDisplay =
//   //   addonCat.length !== 0 ? "customization Available" : "Not Available";
//   const customization =
//     addonCat.length !== 0 && dish_Availability ? "color-blue" : "color-red";

//   const [count, setCount] = useState(0);
//   return (
//     <CartContext.Consumer>
//       {(value) => {
//         const { Increase_cart_items, Decrease_cart_items } = value;
//         const onClickIncrement = () => {
//           Increase_cart_items();
//           setCount(count + 1);
//         };
//         const onClickDecrement = () => {
//           Decrease_cart_items();
//           if (count !== 0) {
//             setCount(count - 1);
//           }
//         };

//         return (
//           <li className="grid-layout">
//             <div>
//               <p className="dish-name">{dish_name}</p>
//               <span className="font-weight-2">{dish_currency}</span>
//               <span className="font-weight-2 dish-price">{dish_price}</span>
//               <p className="dish-description">{dish_description}</p>
//               {dish_Availability && (
//                 <div className="button-style">
//                   <button className="button-change" onClick={onClickDecrement}>
//                     -
//                   </button>
//                   <span>{count}</span>
//                   <button className="button-change" onClick={onClickIncrement}>
//                     +
//                   </button>
//                 </div>
//               )}
//               <p className={`${customization} text-display`}>
//                 {availability()}
//               </p>
//             </div>
//             <div>
//               <p className="calories">{dish_calories} calories</p>
//             </div>
//             <div>
//               <img className="food-Image" src={dish_image} alt={dish_name} />
//             </div>
//           </li>
//         );
//       }}
//     </CartContext.Consumer>
//   );
// };

// export default Dish;
