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

//PUT /api/products/:productId
router.put("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = req.body.product;
    const categories = req.body.categories;
    console.log(categories, "categories");
    const response = await Product.update(product, {
      where: { id: productId },
      include: Category,
    });
    const updatedProduct = response.dataValues;
    // let newCategories = [];
    // if (categories.length) {
    //   newCategories = await Promise.all(
    //     categories
    //       .map(async (category) => {
    //         const dbCategory = Category.findOne({
    //           where: { name: category },
    //         });
    //         return dbCategory;
    //       })
    //       .map((category) => category.dataValues)
    //   );
    //   console.log(newCategories, "new cats");
    // }
    // console.log(newCategories, "new cats");
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
