const { handleSignIn, handleSignUp, handleUpdateUser } = require("../controllers/AuthControllers");

const router = require("express").Router();

router.post("/signin",handleSignIn)
router.post("/signup",handleSignUp)
router.put("/:userId",handleUpdateUser)

module.exports = router;
