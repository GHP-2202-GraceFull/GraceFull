const Sequelize = require("sequelize");
const db = require("../db");

// Create a products model with a title*, description*, price*, quantity (defaults to 0), and photo.
// If there is no photo, there must be a placeholder photo used.

// Products must belong to at least one category => see server/db/index.js for associations.

const Product = db.define("product", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(10,2),
    allowNull: false,
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  imageUrl: {
    type: Sequelize.STRING,
    //defaults to placeholder image of a smoothie bowl
    defaultValue:
      "https://images.unsplash.com/photo-1590301157284-ab2f8707bdc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Product;
