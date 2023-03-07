const { Op } = require("sequelize");
const { Friend, User } = require("../models");
const createError = require("../util/createError");
const { FRIEND_ACCEPTER, FRIEND_PENDING } = require("../config/constant");

exports.requestFriend = async (req, res, next) => {
  try {
    // console.log(req.params.userId)
    if (req.user.id === +req.params.userId) {
      createError("cannot request yourself");
    }
    const existFriend = await Friend.findOne({
      where: {
        [Op.or]: [
          { requesterId: req.params.userId, accepterId: req.user.id },
          { requesterId: req.user.id, accepterId: req.params.userId },
        ],
      },
    });
    if (existFriend) {
      createError("Already friend or pending", 400);
    }
    const addFriend = await Friend.create({
      requesterId: req.user.id,
      accepterId: +req.params.userId,
      status: FRIEND_PENDING,
    });

    const newFriendLists = await Friend.findOne({
      where: {
        [Op.and]: [
          { requesterId: addFriend.requesterId },
          { accepterId: addFriend.accepterId },
        ],
      },
      include: [
        { model: User, as: "Requester", attributes: { exclude: ["password"] } },
        { model: User, as: "Accepter", attributes: { exclude: ["password"] } },
      ],
    });

    res.status(201).json(newFriendLists);
  } catch (err) {
    next(err);
  }
};

exports.acceptFriend = async (req, res, next) => {
  try {
    const [totalRowUpdate] = await Friend.update(
      {
        status: FRIEND_ACCEPTER,
      },
      {
        where: {
          requesterId: req.params.requesterId,
          accepterId: req.user.id,
        },
      },
    );
    if (totalRowUpdate === 0) {
      createError("This user not send request to you", 400);
    }

    const updatedFriendStatus = await Friend.findOne({
      where: {
        [Op.and]: [
          { requesterId: req.params.requesterId },
          { accepterId: req.user.id },
        ],
      },
      include: [
        { model: User, as: "Requester", attributes: { exclude: ["password"] } },
        { model: User, as: "Accepter", attributes: { exclude: ["password"] } },
      ],
    });
    res.status(201).json(updatedFriendStatus);
  } catch (err) {
    next(err);
  }
};

exports.findFriend = async (req, res, next) => {
  try {
    const friend = await Friend.findAll({
      where: {
        // status: FRIEND_ACCEPTER,
        [Op.or]: [{ accepterId: req.user.id }, { requesterId: req.user.id }],
      },
      include: [
        { model: User, as: "Requester", attributes: { exclude: ["password"] } },
        { model: User, as: "Accepter", attributes: { exclude: ["password"] } },
      ],
    });
    console.log(friend);
    res.status(200).json(friend);
  } catch (err) {
    next(err);
  }
};

exports.deleteFriend = async (req, res, next) => {
  try {
    const totalDelete = await Friend.destroy({
      where: {
        [Op.or]: [
          { requesterId: req.params.friendId, accepterId: req.user.id },
          { requesterId: req.user.id, accepterId: req.params.friendId },
        ],
      },
    });
    if (!totalDelete) {
      createError("You do not have relationship with this user", 400);
    }
    res.status(200).json(totalDelete);
  } catch (err) {
    next(err);
  }
};
