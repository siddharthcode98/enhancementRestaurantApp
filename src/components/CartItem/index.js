import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => {
  const {dishes} = props
  // console.log(dishes);
  const {
    addonCat,
    dishCalories,
    dishCurrency,
    dishDescription,
    dishName,
    dishPrice,
    dishImage,
    dishAvailability,
    count,
  } = dishes

  const availability = () => {
    if (dishAvailability) {
      if (addonCat.length !== 0) {
        return 'Customizations available'
      }
    }
    return 'Not Available'
  }

  const customization =
    addonCat.length !== 0 && dishAvailability ? 'color-blue' : 'color-red'

  return (
    <CartContext.Consumer>
      {value => {
        const {
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeCartItem,
        } = value

        const onClickIncrement = () => {
          incrementCartItemQuantity(dishes)
        }
        const onClickDecrement = () => {
          decrementCartItemQuantity(dishes)
        }
        return (
          <li className="grid-layout">
            <div>
              <h1 className="dish-name">{dishName}</h1>
              <p className="font-weight-2">
                {dishCurrency} {(quantity * dishPrice).toFixed(2)}
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
              <button
                type="button"
                onClick={() => removeCartItem(dishes)}
                className="RemoveBtn"
              >
                Remove
              </button>
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

export default CartItem
