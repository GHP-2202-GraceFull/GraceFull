const router = require("express").Router();
const User = require("../db/models/User");

// GET /api/orders
router.get("/", async (req, res, next) => {
  //find user by token and get their cart
  try {
    const user = await User.findByToken(req.headers.authorization);
    //Test code - remove when done
    const orders = await user.getOrders();
    console.log("GET ORDER ROUTE WORKS", orders);
    //End Test code
    res.send(await user.getAllOrders());
  } catch (error) {
    next(error);
  }
});

module.exports = router;

