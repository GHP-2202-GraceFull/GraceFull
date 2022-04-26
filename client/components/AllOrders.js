import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store/orders";

// As an authenticated user I should be able to view the details of a past order (single past order view): current order status, items with quantity and subtotal, link to original product detail page, and date/time the order was created.

const AllOrders = () => {
  const dispatch = useDispatch();
  let orders = useSelector((state) => {
    return state.ordersReducer;
  });

  useEffect(() => {
    dispatch(setOrders());
  }, []);

  console.log("Orders from the AllOrders Component:", orders); // TODO: remove console.log

  return (
    <div>
      <h2>Your Orders</h2>
      <div>
        <h2>In Progress</h2>
      </div>
      <div>
        <h2>Completed</h2>
      </div>
    </div>
  );
};

export default AllOrders;
