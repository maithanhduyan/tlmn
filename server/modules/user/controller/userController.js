const UserService = require("../domain/services/userService");

module.exports = class UserController {
  constructor() {
    this.userService = new UserService();
  }
   async register(req, res, next) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  }

}
