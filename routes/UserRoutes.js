const { User } = require("../models/UserModel");
const { StatusError } = require("../utils/error");

const router = require("express").Router();

//get user by id
router.get("/:userId", async (req, res) => {
  try {
    const findUser = await User.findOne({ _id: req.params.userId });
    if (!findUser) throw StatusError("User not found", 404);
    res.status(200).send(findUser);
  } catch (err) {
    res.status(err.status || 500).send(err.message);
  }
});

module.exports = router;
