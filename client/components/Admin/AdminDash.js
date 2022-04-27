import React, { useState } from "react";
import { Tab, Tabs } from "@material-ui/core";
import AdminProducts from "./AdminProducts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";

//TODO: styling enhancement -> create theme for material ui
const AdminDash = () => {
  const [tabValue, setTabValue] = useState("products");
  return (
    <div id="dashboard">
      <Tabs
        value={tabValue}
        centered
        indicatorColor="primary"
        onChange={(event, value) => setTabValue(value)}
      >
        <Tab label="Products" value="products" />
        <Tab label="Users" value="users" />
        {/* <Tab label="Orders" value="orders" /> */}
      </Tabs>
      {tabValue === "products" && <AdminProducts />}
      {tabValue === "users" && <AdminUsers />}
      {/* {tabValue === "orders" && <AdminOrders />} */}
    </div>
  );
};

export default AdminDash;
