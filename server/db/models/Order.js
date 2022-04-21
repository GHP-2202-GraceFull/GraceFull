const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    lineItems: {
        type: Array,
    },
    email: {

    },
    shippingAddress: {

    }
})

//TODO associate to user || guest session
//TODO discuss how to do line items with team

//Name | Email

//take addToCart reducer array and insert array into order (product title, product title, product )

//loop through array and add all prices