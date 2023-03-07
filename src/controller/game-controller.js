const { Game } = require("../models");
const createError = require("../util/createError");
const { Op } = require("sequelize");

exports.getAllGame = async (req, res, next) => {
  try {
    const game = await Game.findAll({
      where: { deletedAt: null },
    });
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};

exports.getGame = async (req, res, next) => {
  try {
    const { steamAppid } = req.params;
    const game = await Game.findOne({ where: { steamAppid } });
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};

exports.getGameByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const game = await Game.findAll({
      where: {
        [Op.like]: `%${name}%`,
        deletedAt: null,
      },
    });
    if (!game) {
      createError("This game not have in my store", 400);
    }
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};
