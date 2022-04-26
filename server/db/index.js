//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Order = require("./models/Order");
const LineItem = require("./models/Lineitem");

//TODO: associations could go here!
//Product - Category = Many to Many

Product.belongsToMany(Category, { through: "product_categories" });
Category.belongsToMany(Product, { through: "product_categories" });

//Product - Order
// Product.belongsTo(Order);
// Order.hasMany(Product);

//Lineitem  - Order
LineItem.belongsTo(Order);
Order.hasMany(LineItem);

//Lineitem - Product
LineItem.belongsTo(Product);
//Product.hasMany(LineItem);

//User - Order
Order.belongsTo(User);
User.hasMany(Order);

module.exports = {
  db,
  models: {
    User,
    Product,
    Category,
    Order,
    LineItem,
  },
};
