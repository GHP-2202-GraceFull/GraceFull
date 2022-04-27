const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

//TODO: better protect this route since it's now sending more user info

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "username", "email", "admin"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const userEdits = req.body;
    const { data } = await User.update(userEdits, { where: { id: userId } });
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { data } = await User.destroy({ where: { id: req.params.id } });
    res.send(data);
  } catch (error) {
    next(error);
  }
});
