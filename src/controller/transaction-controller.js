const { Transaction, Cart, Game } = require("../models");
const createError = require("../util/createError");
exports.createTransaction = async (req, res, next) => {
  try {
    const { gameArrId, token } = req.body;
    const { id } = req.user;
    const value = gameArrId.reduce((acc, el) => {
      acc.push({ userId: id, gameId: el, token });
      return acc;
    }, []);

    // for (let game of gameArrId) {
    //   const gameExist = await Transaction.findOne({
    //     where: {
    //       gameId: game,
    //       userId: id,
    //     },
    //   });
    //   if (gameExist) {
    //     createError("Error,The game has already in table", 400);
    //   }
    // }

    const trans = await Transaction.bulkCreate(value, {
      where: { deletedAt: null },
    });

    const result = await Cart.destroy({
      where: {
        userId: req.user.id,
        deletedAt: null,
      },
    });

    res.status(200).json(trans);
  } catch (err) {
    next(err);
  }
};

exports.getTransaction = async (req, res, next) => {
  try {
    const { id } = req.user;
    const trans = await Transaction.findAll({
      where: {
        userId: id,
        deletedAt: null,
      },
      include: { model: Game },
      //   attributes: {exclude: ['token']},
    });
    res.status(200).json(trans);
  } catch (err) {
    next(err);
  }
};
