const User = require("../models/user");

class UserRepository {
  constructor(database) {
    this.db = database;
  }

  async createUser(user) {
    const {
      name,
      email,
      password
    } = user;
    const newUser = new User(name, email, password);

    const result = await this.db.query(
      "INSERT INTO user(name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [newUser.name, newUser.email, newUser.password]
    );
    newUser.id = result.rows[0].id;

    return newUser;
  }

  async getUserById(id) {
    const result = await this.db.query(
      "SELECT * FROM user WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const {
      name,
      email,
      password
    } = result.rows[0];
    const user = new User(name, email, password);
    user.id = id;

    return user;
  }

  async getUserByEmail(email) {
    const result = await this.db.query(
      "SELECT * FROM user WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const {
      id,
      name,
      password
    } = result.rows[0];
    const user = new User(name, email, password);
    user.id = id;

    return user;
  }

  async updateUser(id, newData) {
    const {
      name,
      email,
      password
    } = newData;

    await this.db.query(
      "UPDATE user SET name = $1, email = $2, password = $3 WHERE id = $4",
      [name, email, password, id]
    );

    const updatedUser = new User(name, email, password);
    updatedUser.id = id;

    return updatedUser;
  }

  async deleteUser(id) {
    await this.db.query("DELETE FROM user WHERE id = $1", [id]);
  }
}

module.exports = UserRepository;