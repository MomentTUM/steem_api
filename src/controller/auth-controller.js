const {
  validateRegister,
  validateLogin,
} = require("../validator/auth-validate");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const createError = require("../util/createError");

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);
    console.log(req.body);

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: value.email || "" },
          { userName: value.userName || "" },
        ],
      },
    });
    if (user) {
      createError("Email is already used", 400);
    }
    value.password = await bcrypt.hash(value.password, 12);
    await User.create(value);
    res.status(201).json({ message: "Register success" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const value = validateLogin(req.body);

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: value.emailOrUserName },
          { userName: value.emailOrUserName },
        ],
      },
    });
    if (!user) {
      createError("Invalid email or username or password", 400);
    }
    const isCorrect = await bcrypt.compare(value.password, user.password);
    if (!isCorrect) {
      createError("Invalid email or username or password2", 400);
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        email: user.email,
        password: user.password,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    );
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    console.log(req.params);
    const deleteUser = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!deleteUser) {
      createError("You not have permission to delete this user");
    }
    await deleteUser.destroy();
    res.status(200).json({ message: "Delete user success" });
  } catch (err) {
    next(err);
  }
};
