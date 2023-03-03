const { User, Friend } = require("../models");
const createError = require("../util/createError");
const { validateCreateProfile } = require("../validator/profile-validate");
// const {
//   FRIEND_ACCEPTED,
//   STATUS_UNKNOWN,
//   STATUS_FRIEND,
//   STATUS_ACCEPTER,
//   STATUS_REQUESTER,
//   STATUS_ME,
// } = require("../config/constant");
const { Op } = require("sequelize");

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
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      createError("You not have permission to access this user", 400);
    }

    const userFriends = await Friend.findAll({
      where: {
        [Op.or]: [
          { requesterId: req.params.userId },
          { accepterId: req.params.userId },
        ],
      },
      include: [
        { model: User, as: "Requester", attributes: { exclude: ["password"] } },
        { model: User, as: "Accepter", attributes: { exclude: ["password"] } },
      ],
    });
    // const friends = userFriends.map((el) =>
    //   el.requesterId === +req.params.userId ? el.Accepter : el.Requester,
    // );

    // let statusWithAuthUser;
    // if (req.user.id === +req.params.userId) {
    //   statusWithAuthUser = STATUS_ME;
    // } else {
    //   const existFriend = await Friend.findOne({
    //     where: {
    //       [Op.or]: [
    //         { requesterId: req.params.userId, accepterId: req.user.id },
    //         { requesterId: req.user.id, accepterId: req.params.userId },
    //       ],
    //     },
    //   });
    //   if (!existFriend) {
    //     statusWithAuthUser = STATUS_UNKNOWN;
    //   } else if (existFriend.status === FRIEND_ACCEPTED) {
    //     statusWithAuthUser = STATUS_FRIEND;
    //   } else if (existFriend.requesterId === req.user.id) {
    //     statusWithAuthUser = STATUS_ACCEPTER;
    //   } else {
    //     statusWithAuthUser = STATUS_REQUESTER;
    //   }
    // }

    res.status(200).json({ user, userFriends });
  } catch (err) {
    next(err);
  }
};

exports.getUserByUserName = async (req, res, next) => {
  try {
    const { searchName = "" } = req.query;
    const user = await User.findAll({
      where: {
        userName: { [Op.like]: `%${searchName}%` },
      },
    });
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
