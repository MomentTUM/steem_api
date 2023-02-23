const { Game } = require("../models");
const createError = require("../util/createError");
const { Op } = require("sequelize");

exports.getAllGame = async (req, res, next) => {
  try {
    const game = await Game.findAll();
    res.status(200).json({ game });
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
      },
    });
    if (!game) {
      createError("This game not have in my store", 400);
    }
    res.status(200).json({ game });
  } catch (err) {
    next(err);
  }
};
