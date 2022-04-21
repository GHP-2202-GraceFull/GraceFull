const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineitem", {
  orderId: {
    //placeholder, this will be autopopulated once association will be set up
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  productId: {
    //placeholder, this will be autopopulated once association will be set up
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = LineItem;
