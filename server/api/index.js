const router = require("express").Router();

router.use('/products', require('./products'))
router.use('/cart', require('./cart'))
router.use('/orders', require('./orders'))
router.use("/products", require("./products"));
router.use("/cart", require("./cart"));
router.use("/categories", require("./categories"));
router.use("/users", require("./users"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
