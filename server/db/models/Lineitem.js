const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineitem", {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});

module.exports = LineItem;
