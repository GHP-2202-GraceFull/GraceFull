const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
    total: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})

//TODO associate to user || guest session
//TODO discuss how to do line items with team