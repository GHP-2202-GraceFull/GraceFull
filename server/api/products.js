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
    const product = req.body.product;
    const categories = req.body.categories;
    const newProduct = await Product.create(product);
    if (categories.length) {
      await Promise.all(
        categories.map(async (category) => {
          const dbCategory = await Category.findAll({
            where: { name: category },
          });
          newProduct.addCategory(dbCategory);
        })
      );
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
    const productToUpdate = await Product.findOne({ where: { id: productId } });
    const updatedProduct = await productToUpdate
      .update(product, {
        where: { id: productId },
        include: Category,
      })
      .then((result) => result.save());

    //there's probably a much better way to do this, but:
    //remove all associated categoires
    const dbCategories = await Category.findAll();
    const catIdxArr = Array.from(Array(dbCategories.length + 1).keys());
    updatedProduct.removeCategories(catIdxArr);

    //...then add all categories from selected checkboxes in form
    if (categories.length) {
      for (let i = 0; i < categories.length; i++) {
        console.log(updatedProduct, "updatedProduct");

        const cat = await Category.findOne({ where: { name: categories[i] } });
        console.log(cat.dataValues.id, "cat id");
        await updatedProduct.addCategory(cat);
      }
    }
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
