// userRoute.js
const express = require("express");
const path = require("path");
const router = express.Router();
const UserController = require("./controller/userController");
// router.post("/", userController.createUser);
// router.get("/:id", userController.getUserById);
// router.get("/email/:email", userController.getUserByEmail);
// router.put("/:id", userController.updateUser);

module.exports = class UserRouter {
  constructor() {
    this.router = express.Router();
    this.userController = new UserController();

    // Định nghĩa router cho trang đăng ký
    this.router.get("/register", (req, res) => {
      res.sendFile(path.join(__dirname, "../../public/register.html"));
    });
    this.router.post("/register", this.userController.register);
  }
};
