const router = require("express").Router();
const Category = require("../db/models/Category");

//GET  /api/categories
router.get("/", async (req, res, next) => {
  try {
    console.log("categories api route");
    const categories = await Category.findAll();
    console.log(categories, " categories in api route");
    res.send(categories);
  } catch (error) {
    next(error);
  }
});

//POST /api/categories
router.post("/", async (req, res, next) => {
  try {
    const newCategory = await Category.create(req.body);
    res.send(newCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
