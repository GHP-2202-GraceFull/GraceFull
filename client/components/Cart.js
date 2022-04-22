import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../store/singleProduct";
import { addToCart } from "../store/addToCart";

const Cart = () => {
  const dispatch = useDispatch();
  //use a react reducer not redux
  const state = useSelector((state) => state);
  const [itemCount, setItemCount] = useState(1)
  console.log("STATE", state);
  const itemsInCart = useSelector((state) => state.addToCartReducer);
  const allItemsInStock = useSelector((state) => state.allProducts);

  console.log("itemsInCart", itemsInCart);

  const total = itemsInCart.reduce(
    (accum, item) => accum + (item.price || 0),
    0
  );

  function decrementItemCount(){
    setItemCount(prevCount => prevCount - 1)
    //add use dispatch action
  }

  function incrementItemCount(){
    setItemCount(prevCount => prevCount + 1)
       //add use dispatch action
  }

  return (
    <div className="cart">
      <h3>GraceFull Shopping Cart</h3>
      <h4>
        <span className="itemCount">
          There are {itemsInCart.length} items in the cart
        </span>
      </h4>
      <ul className="items-in-cart">
        {itemsInCart.map((item) => {
          return (
            <div key={item.id}>
              <img className="item-image" src={item.imageUrl} />
              <li>{item.title}</li>
              <li>Price: ${item.price}</li>
              <li>Quantity
              <button onClick={decrementItemCount}> - </button>
              <span> {itemCount} </span>
              <button onClick={incrementItemCount}> + </button>
              <button>Remove item from cart</button></li>
            </div>
          );
        })}
      </ul>
      <div className="cartSummary">
        <ul>
          <li>
            Total <span> ${total}</span>
          </li>
          <button>Checkout</button>
        </ul>
      </div>
    </div>
  );
};

export default Cart;

//add +/- button to each item added to the cart
// add remove from cart button

  //   useEffect(() => {
  //     dispatch(fetchSingleProduct(productId));
  //   }, []);
