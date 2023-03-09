const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res
        .status(409).json({ message: "Email đã tồn tại. Vui lòng thử lại!" });
    }
    // Kiểm tra user đã tồn tại chưa
    const existingUsername = await User.findByUsername(username);
    if (existingUsername) {
      return res
        .status(409).json({ message: "User đã tồn tại. Vui lòng thử lại!" });
    }

    // Tạo user mới
    const user = new User(username, email, password);
    const result = await user.save();

    // Trả về kết quả
    return res.status(201).json({ message: "Đăng ký tài khoản thành công!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500).json({ message: "Đăng ký tài khoản thất bại. Vui lòng thử lại!" });
  }
};
