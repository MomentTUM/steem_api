const { Cart, Transaction, Game } = require("../models");
const createError = require("../util/createError");

exports.addToCart = async (req, res, next) => {
  try {
    // console.log(req.params)
    const existCart = await Cart.findOne({
      where: {
        profileId: req.params.profileId,
        gameId: req.params.gameId,
      },
    });
    if (existCart) {
      createError("This game already in cart", 400);
    }
    const newCart = await Cart.create({
      profileId: req.params.profileId,
      gameId: req.params.gameId,
    });
    res.status(200).json({ newCart });
  } catch (err) {
    next(err);
  }
};

//front-end don't need to send body from post method
//since get params and request user from authMiddleware
exports.setCart = async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: { steam_appid: req.params.steamAppId },
    });

    const existCart = await Cart.findOne({
      where: {
        userId: req.user.id,
        gameId: game.id,
      },
    });
    if (existCart) {
      createError("This game already in cart", 400);
    }
    const newCart = await Cart.create({
      userId: req.user.id,
      gameId: game.id,
    });
    res.status(200).json(newCart);
  } catch (err) {
    next(err);
  }
};

//when finish create transaction, must delete the game item(steamAppid)
//from cart table
exports.getCart = async (req, res, next) => {
  try {
    console.log(req.user.id);
    const cart = await Cart.findAll();
    const cartByUserId = cart.filter(
      (el) => el.dataValues.userId === req.user.id,
    );
    console.log(cartByUserId);
    res.status(200).json(cartByUserId);
  } catch (err) {
    next(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findOne({
      where: {
        id: cartId,
      },
    });
    if (!cart) {
      createError("This item not match", 400);
    }
    if (cart.userId !== req.user.id) {
      createError("You not have permission to delete item", 400);
    }
    const result = await Cart.destroy({ where: { id: cartId } });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.removeItemFromCart = async (req, res, next) => {
  try {
    const { cartId, profileId } = req.params;
    const cart = await Cart.findOne({
      where: {
        id: cartId,
      },
    });
    if (!cart) {
      createError("This item not match", 400);
    }
    if (cart.profileId !== profileId) {
      createError("You not have permission to delete item", 400);
    }
    await cart.destroy({ id: cart });
    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};
