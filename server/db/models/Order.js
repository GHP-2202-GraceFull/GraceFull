const Sequelize = require("sequelize");
const db = require("../db");
const sendEmail = require('../../email/orderPurchased')

const Order = db.define("order", {
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    streetAddress:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    zip: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})


Order.afterUpdate(async (order) =>{
    if(order.status==='purchased'){
        sendEmail()
    }
})

//add create order and edit order to seed file