const { Op } = require("sequelize");
const { Friend } = require("../models");
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
      createError("Already friend or pending");
    }
    await Friend.create({
      requesterId: req.user.id,
      accepterId: req.params.userId,
      status: FRIEND_PENDING,
    });
    res.status(201).json({ message: "success friend request" });
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
      createError("This user not send request to you");
    }
    res.status(201).json({ message: "Success add friend" });
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
    res.status(204).json({ message: "Success delete this friend" });
  } catch (err) {
    next(err);
  }
};
