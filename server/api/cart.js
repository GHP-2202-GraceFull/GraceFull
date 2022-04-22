const router = require("express").Router();
const User = require("../db/models/User");
const Order = require("../db/models/Order");
// const Category = require("../db/models/Category");
// const LineItem = require("../db/models/Lineitem");
// const Product = require("../db/models/Product");

// GET /api/cart
router.get("/", async (req, res, next) => {
  //find user by token and get their cart
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  } catch (error) {
    next(error);
  }
});

// POST /api/addToCart
router.post("/addToCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body)); //req.body = product
  } catch (error) {
    next(error);
  }
});

// POST /api/removeFromCart
router.post("/removeFromCart", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body)); //req.body = product
  } catch (error) {
    next(error);
  }
});
//Team Note: We may want to consider middleware to replace const user = await....

//We are still sorting out our Order model and methods
//This would create an order from the cart (change order status from "CART" to "ORDER")
//Need to determine routes required for authenticated users vs non authenticated users

/////////////////////  (PENDING) ORDER ROUTES BELOW ///////////////////////////

//POST /api/createOrder - Will we need this for unauthenticated users?
// router.post("/createOrder", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     res.send(await user.createOrder()); //req.body = product
//   } catch (error) {
//     next(error);
//   }
// });

//POST /api/
// router.post("/updateOrder", async (req, res, next) => {
//   try {
//     const order = await Order.findByPk(????);
//     res.send(await ???.createOrder()); //req.body = product
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = router;
