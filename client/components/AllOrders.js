import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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

  console.log("Orders from the AllOrders Component:", orders); // ToDo: remove console.log

  return (
    <div key>
      <h2>Your Orders</h2>
      {orders.map((order) => {
        return (
        <div key={order.id}>
          <li>Order number: {order.id}</li>
          <li>Order status: {order.status}</li>
        </div>
        );
      })}
    </div>
  );
};

export default AllOrders;
