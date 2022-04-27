import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrders } from "../store/orders";

// As an authenticated user I should be able to view the details of a past order (single past order view): current order status, items with quantity and subtotal, link to original product detail page, and date/time the order was created.

const AllOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => {
    return state.ordersReducer;
  });

  useEffect(() => {
    dispatch(setOrders());
  }, []);

  const ordersInProg = orders.filter((order) => order.status === "ORDER");
  const ordersCompleted = orders.filter((order) => order.status === "SHIPPED");
  //const createDate = new Date(order.createdAt).toString()

  return (
    <>
      <div className="order-container">
        <h2 iclassName="order-text">Order History</h2>
        <div className="order-status-fb">
        <h3 className="order-text">In progress</h3>
          {ordersInProg.map((order) => {
            return (
              <div key={order.id}>
              <ul className="order-li">
                <li>Order# {order.id}</li>
                <li>Order status: PROCESSING</li>
                <li>Order date: {order.createdAt}</li>
                </ul>
              </div>
            );
          })}
        </div>
        <div className="order-status-fb">
        <h3 className="order-text">Completed</h3>
          {ordersCompleted.map((order) => {
            return (
              <div key={order.id}>
              <ul className="order-li">
                <li>Order# {order.id}</li>
                <li>Order status: {order.status}</li>
                <li>Order date: {order.createdAt}</li>
                <li>Completion date: {order.updatedAt}</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllOrders;
