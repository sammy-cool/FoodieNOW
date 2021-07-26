const express = require("express");
const router = express.Router();

const userController = require("../app/controllers/userController");
const { authenticatedUser } = require("../app/middlewares/authentication");

router.post("/users/register", userController.register);
router.post("/users/login", userController.login);

//private route
router.get("/users/account", authenticatedUser, userController.account);
router.delete("/users/logout", authenticatedUser, userController.logout);

module.exports = router;
