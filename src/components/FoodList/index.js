import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Dish from '../Dish'

import MenuItem from '../MenuItem'

import Header from '../Header'

import './index.css'

class FoodList extends Component {
  state = {
    listOfItem: [],
    activeId: null,
    loading: true,
  }

  componentDidMount() {
    this.getFoodList()
  }

  getUpdatedData = tableMenuList => {
    return tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))
  }

  getFoodList = async () => {
    const dishesApiUrl =
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(dishesApiUrl)
    if (response.ok) {
      const data = await response.json()
      const modifiedData = this.getUpdatedData(data[0].table_menu_list)
      this.setState({
        listOfItem: modifiedData,
        activeId: modifiedData[0].menuCategoryId,
        loading: false,
      })
    }
  }
  onClickMenu = menuItem => {
    // console.log(menuItem);
    this.setState({activeId: menuItem})
  }
  render() {
    const {loading, listOfItem, activeId} = this.state
    // console.log(listOfItem);
    const filteredData = listOfItem.find(
      item => item.menuCategoryId === activeId,
    )
    // console.log(filteredData);

    return (
      <main>
        {loading ? (
          <Loader type="Oval" color={'green'} className="loader-style" />
        ) : (
          <>
            <Header />
            <div>
              <ul className="menu-category-list-container">
                {listOfItem.map(item => (
                  <MenuItem
                    key={item.menuCategoryId}
                    details={item}
                    onClickMenu={this.onClickMenu}
                    activeId={activeId}
                  />
                ))}
              </ul>
            </div>
            <section className="food-section">
              <ul className="food-list-container">
                {filteredData.categoryDishes.map(item => (
                  <Dish key={item.dishId} dishes={item} />
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    )
  }
}

export default FoodList

// import { Component } from "react";

// import Dish from "../Dish";

// import MenuItem from "../MenuItem";

// import "./index.css";

// import Loader from "react-spinners/ClipLoader";

// // const menuList = [
// //   { menuCategory: "Salads and Soup", menuCategoryId: "11" },
// //   { menuCategory: "From The Barnyard", menuCategoryId: "12" },
// //   { menuCategory: "From the Hen House", menuCategoryId: "13" },
// //   { menuCategory: "Fresh From The Sea", menuCategoryId: "14" },
// //   { menuCategory: "Biryani", menuCategoryId: "15" },
// //   { menuCategory: "Fast Food", menuCategoryId: "17" },
// // ];

// class FoodList extends Component {
//   state = {
//     listOfItem: [],
//     activeId: null,
//     loading: true,
//   };

//   componentDidMount() {
//     this.getFoodList();
//   }
//   getFoodList = async () => {
//     const apiUrl =
//       "https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc";
//     const response = await fetch(apiUrl);
//     if (response.ok) {
//       const data = await response.json();
//       // console.log(data);
//       const { table_menu_list } = data[0];
//       // console.log(table_menu_list);
//       const modifiedData = table_menu_list.map((item) => ({
//         categoryDishes: item.category_dishes,
//         menuCategory: item.menu_category,
//         menuCategoryId: item.menu_category_id,
//         menuCategoryImage: item.menu_category_image,
//         nextUrl: item.nexturl,
//       }));
//       this.setState({
//         listOfItem: modifiedData,
//         activeId: modifiedData[0].menuCategoryId,
//         loading: false,
//       });
//     }
//   };
//   getFilteredFood = () => {};
//   onClickMenu = (menuItem) => {
//     // console.log(menuItem);
//     this.setState({ activeId: menuItem });
//   };
//   render() {
//     const { loading, listOfItem, activeId } = this.state;
//     // console.log(listOfItem);
//     const filteredData = listOfItem.find(
//       (item) => item.menuCategoryId === activeId
//     );
//     // console.log(filteredData);

//     return (
//       <main>
//         {loading ? (
//           <Loader type="Oval" color={"green"} className="loader-style" />
//         ) : (
//           <>
//             <div>
//               <ul className="menu-category-list-container">
//                 {listOfItem.map((item) => (
//                   <MenuItem
//                     key={item.menuCategoryId}
//                     details={item}
//                     onClickMenu={this.onClickMenu}
//                     activeId={activeId}
//                   />
//                 ))}
//               </ul>
//             </div>
//             <section className="food-section">
//               <ul className="food-list-container">
//                 {filteredData.categoryDishes.map((item) => (
//                   <Dish key={item.dish_id} dishes={item} />
//                 ))}
//               </ul>
//             </section>
//           </>
//         )}
//       </main>
//     );
//   }
// }

// export default FoodList;
