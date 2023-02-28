const { Cart } = require("../models");
const createError = require("../util/createError");

exports.addToCart = async (req, res, next) => {
  try {
    console.log(req.params);
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
