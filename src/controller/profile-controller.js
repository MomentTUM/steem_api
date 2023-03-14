const { Profile } = require("../models");
const createError = require("../util/createError");
const { validateCreateProfile } = require("../validator/profile-validate");
// const cloudinary = require('../util/cloudinary');

exports.createProfile = async (req, res, next) => {
  try {
    const value = validateCreateProfile({
      name: req.body.name,
      image: req.files?.image[0].path,
      coverImage: req.files?.coverImage[0].path,
    });

    value.userId = req.user.id;

    const profile = await Profile.create({
      name: value.name,
      image: value.image,
      coverImage: value.coverImage,
      userId: value.userId,
    });
    res.status(201).json({ profile });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const value = validateCreateProfile({
      name: req.body.name,
      image: req.files?.image[0].path,
      coverImage: req.files?.coverImage[0].path,
    });
    // console.log(req.params.profileId);
    const result = await Profile.update(
      {
        name: value.name,
        image: value.image,
        coverImage: value.coverImage,
      },
      {
        where: {
          id: req.params.profileId,
        },
      },
    );
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

exports.getProfileById = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({
      where: {
        id: req.params.profileId,
      },
    });
    if (!profile) {
      createError("You not have permission to access this profile");
    }
    res.status(200).json({ profile });
  } catch (err) {
    next(err);
  }
};
