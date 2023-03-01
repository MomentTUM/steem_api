const { Cart, Transaction } = require("../models");
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
    const existCart = await Cart.findOne({
      where: {
        userId: req.user.id,
        steamAppid: req.params.steamAppId,
      },
    });
    if (existCart) {
      createError("This game already in cart", 400);
    }
    const newCart = await Cart.create({
      userId: req.user.id,
      steamAppid: req.params.steamAppId,
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
    const cart = await Cart.findAll({
      where: { userId: req.use.id },
      include: { model: Game, include: { model: GameImage } },
    });
    res.status(200).json(cart);
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
