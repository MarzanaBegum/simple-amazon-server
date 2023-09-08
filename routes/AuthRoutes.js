const { handleSignIn, handleSignUp, handleUpdateUser } = require("../controllers/AuthControllers");

const router = require("express").Router();

router.post("/signin",handleSignIn)
router.post("/signup",handleSignUp)
router.put("/user",handleUpdateUser)

module.exports = router;
