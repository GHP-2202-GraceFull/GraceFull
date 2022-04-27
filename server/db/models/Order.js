const Sequelize = require("sequelize");
const db = require("../db");
const sendEmail = require('../../email/orderPurchased')

const Order = db.define("order", {
  status: {
    type: Sequelize.ENUM("CART", "ORDER", "SHIPPED"),
    defaultValue: "CART",
    allowNull: false,
  },
  total: {
    type: Sequelize.INTEGER,
  //  allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
  // allowNull: false,
  },
  streetAddress: {
    type: Sequelize.STRING,
  //  allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
//   allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
 //   allowNull: false,
  },
  zip: {
    type: Sequelize.STRING,
 //   allowNull: false,
  },
});

Order.afterUpdate(async (order) => {
  if(order.status === 'ORDER'){
    //TODO calculate lineitems
  }
})

module.exports = Order;

//beforeCreate = add line items to calculate order total?

//to do
