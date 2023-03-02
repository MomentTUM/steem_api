const { User } = require("../models");
const createError = require("../util/createError");
const { validateCreateProfile } = require("../validator/profile-validate");

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

exports.updateProfileUser = async (req, res, next) => {
  try {
    const value = validateCreateProfile({
      name: req.body.name,
      image: req.files?.image[0].path,
      coverImage: req.files?.coverImage[0].path,
    });
    console.log(req.params);
    const user = await User.update(
      {
        name: value.name,
        image: value.image,
        coverImage: value.coverImage,
      },
      {
        where: {
          id: req.params.userId,
        },
      },
    );
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};
