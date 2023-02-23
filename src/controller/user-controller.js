const { User } = require("../models");
const createError = require("../util/createError");

exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      createError("You not have permission to access this user", 400);
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
