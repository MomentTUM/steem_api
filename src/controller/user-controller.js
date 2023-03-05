const fs = require("fs");
const { User } = require("../models");
const createError = require("../util/createError");
const { validateCreateProfile } = require("../validator/profile-validate");
const cloudinary = require("../util/cloudinary");

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
      attributes: { exclude: ["password"] },
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
    // const name = validateCreateProfile({
    //   name: req.body.name,
    //   image: req.files?.image?.[0]?.path,
    //   coverImage: req.files?.coverImage?.[0]?.path,
    // });
    let value;
    const name = req.body.name;
    const { image, coverImage } = req.user;
    const imagePublicId = image ? cloudinary.getPublicId(image) : null;
    const coverPublicId = coverImage
      ? cloudinary.getPublicId(coverImage)
      : null;

    if (!req.files?.image && !req.files?.coverImage) {
      value = { name };
    } else if (req.files?.image && req.files?.coverImage) {
      const [image, coverImage] = await Promise.all([
        cloudinary.upload(req.files?.image?.[0]?.path, imagePublicId),
        cloudinary.upload(req.files?.coverImage?.[0]?.path, coverPublicId),
      ]);
      value = { name, image, coverImage };
    } else if (req.files?.image) {
      const image = await cloudinary.upload(
        req.files?.image?.[0]?.path,
        imagePublicId,
      );
      value = { name, image };
    } else {
      const coverImage = await cloudinary.upload(
        req.files?.coverImage?.[0]?.path,
        coverPublicId,
      );
      value = { name, coverImage };
    }

    const user = await User.update(value, { where: { id: req.user.id } });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  } finally {
    if (req.files?.image) {
      fs.unlinkSync(req.files?.image?.[0].path);
    }
    if (req.files?.coverImage) {
      fs.unlinkSync(req.files?.coverImage?.[0].path);
    }
  }
};
