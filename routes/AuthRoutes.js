const { handleSignIn, handleSignUp } = require("../controllers/AuthControllers");

const router = require("express").Router();

router.post("/signin",handleSignIn)
router.post("/signup",handleSignUp)

module.exports = router;
