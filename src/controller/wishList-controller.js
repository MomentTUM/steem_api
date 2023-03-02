const { WishList, Game } = require("../models");
const createError = require("../util/createError");

exports.addWishList = async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: { steam_appid: req.params.steamAppId },
    });
    const wishList = await WishList.findOne({
      where: {
        userId: req.user.id,
        gameId: game.id,
      },
    });
    if (wishList) {
      createError("This user already have this game", 400);
    }
    const result = WishList.create({
      userId: req.user.id,
      gameId: game.id,
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteWishList = async (req, res, next) => {
  try {
    const { wishlistId } = req.params;
    const wishList = await WishList.findOne({
      where: {
        id: wishlistId,
      },
    });
    if (!wishList.dataValues.id) {
      createError("You not have this wish list", 400);
    }
    if (wishList.dataValues.userId !== req.user.id) {
      createError("You not have permission to delete wish list", 400);
    }
    await WishList.destroy({ where: { id: wishList.dataValues.id } });
    res.status(204).json({ wishList });
  } catch (err) {
    next(err);
  }
};

exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await WishList.findAll({
      include: {
        model: Game,
      },
    });
    const wishlistByUserId = wishlist.filter(
      (el) => el.dataValues.userId === req.user.id,
    );

    res.status(200).json(wishlistByUserId);
  } catch (err) {
    next(err);
  }
};

//To find wishlist by steamAppid
exports.findWishlist = async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: { steamAppid: req.query.steamAppid },
    });
    const wishlist = await WishList.findOne({
      where: { gameId: game?.id },
      include: {
        model: Game,
      },
    });
    res.status(200).json(wishlist);
  } catch (err) {
    next(err);
  }
};
