const UserRepository = require("../repositories/userRepository");

module.exports = class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(userData) {
    // Validate user data before creating a new user
    const { email, password } = userData;
    if (!email || !password) {
      throw new Error("Email and password are required!");
    }

    // Check if user with the same email already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists!");
    }

    // Create and save new user
    const newUser = await this.userRepository.createUser(userData);

    return newUser;
  }

  async getUserById(userId) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  }

  async updateUser(userId, updatedUserData) {
    // Validate updated user data
    const { email, password } = updatedUserData;
    if (!email || !password) {
      throw new Error("Email and password are required!");
    }

    // Check if user with the same email already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser && existingUser._id.toString() !== userId) {
      throw new Error("User with this email already exists!");
    }

    // Update user and return updated user data
    const updatedUser = await this.userRepository.updateUser(
      userId,
      updatedUserData
    );

    return updatedUser;
  }

  async deleteUser(userId) {
    // Check if user exists
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found!");
    }

    // Delete user and return deleted user data
    const deletedUser = await this.userRepository.deleteUser(userId);

    return deletedUser;
  }

  async getUserByEmail(email) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  }

  async getUserByUsername(username) {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  }
};
