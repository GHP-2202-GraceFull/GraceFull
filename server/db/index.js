//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Category = require("./models/Category");
const Order = require("./models/Order");

//TODO: associations could go here!
//Product - Category = Many to Many

Product.belongsToMany(Category, { through: "product_categories" });
Category.belongsToMany(Product, { through: "product_categories" });

module.exports = {
  db,
  models: {
    User,
    Product,
    Category,
    Order,
  },
};
