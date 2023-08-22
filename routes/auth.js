const router = require("express").Router();
const authController = require("../controllers/authControllers");

router.post("/register", authController.createUser);
router.get("/login", authController.loginUser);

module.exports = router;
