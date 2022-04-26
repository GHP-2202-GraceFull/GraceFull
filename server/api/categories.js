const router = require("express").Router();
const Category = require("../db/models/Category");

//GET  /api/categories
router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll();
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

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedCategory = await Category.destroy({
      where: { id: req.params.id },
    });
    res.sendStatus(204).send(deletedCategory);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
