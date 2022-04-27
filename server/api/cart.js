const router = require("express").Router();
const User = require("../db/models/User");

// GET /api/cart
router.get("/", async (req, res, next) => {
  //find user by token and get their cart
  try {
    const user = await User.findByToken(req.headers.authorization);
    // const cart = await user.getCart();
    // console.log("CART WORKS", cart);
    res.send(await user.getCart());
  } catch (error) {
    next(error);
  }
});

// POST (Add To Cart) /api/cart
router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body)); //req.body = product
    // console.log(`req.body`, req.body);
  } catch (error) {
    next(error);
  }
});


//PUT (checkout cart to order) /api/cart
router.put("/", async (req, res, next) => {
  console.log(req.body)
  try {
    const user = await User.findByToken(req.headers.authorization);
    await user.checkoutCart(req.body); //req.body = shippingInfo 
        res.status(204).end()
  } catch (error) {
    next(error);
  }
});

// DELETE (Remove From Cart) /api/cart
router.post("/remove", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    // console.log(`REMOVE ALL: delete req.body`, req.body);
    res.send(await user.removeFromCart(req.body)); //req.body = product
  } catch (error) {
    next(error);
  }
});

// DELETE (Remove ALl From Cart) /api/cart
router.post("/removeAll", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);

    console.log(`REMOVE ALL: delete req.body`, req.body);
    res.send(await user.removeAllFromCart(req.body)); //req.body = product
  } catch (error) {
    next(error);
  }
});

module.exports = router;
