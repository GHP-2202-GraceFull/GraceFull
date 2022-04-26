const router = require("express").Router();
const Category = require("../db/models/Category");
const Product = require("../db/models/Product");

//GET  /api/products
router.get("/", async (req, res, next) => {
  try {
    console.log("getting all products");
    const products = await Product.findAll({ include: Category });
    res.send(products);
  } catch (error) {
    next(error);
  }
});

//POST /api/products
router.post("/", async (req, res, next) => {
  try {
    const product = req.body.product,
      categories = req.body.categories;
    const newProduct = await Product.create(product);
    if (categories.length) {
      categories.map(async (category) => {
        const dbCategory = await Category.findAll({
          where: { name: category },
        });
        newProduct.addCategory(dbCategory);
      });
    }
    res.status(201).send(newProduct);
  } catch (error) {
    next(error);
  }
});

//GET /api/products/:productId
router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const response = await Product.findByPk(productId);
    const singleProduct = response.dataValues;
    res.send(singleProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
