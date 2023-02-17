const {WishList} = require("../models")
const createError = require("../util/createError")

exports.addWishList = async (req, res, next) => {
    try {
        const {gameId, userId} = req.params
        // console.log(req.params)
        const wishList = await WishList.findOne({
            where: {
                gameId: gameId,
                userId: userId
            }
        })
        if (wishList) {
            createError("This user already have this game")
        }
        const result = WishList.create({
            gameId: gameId,
            userId: userId
        })
    } catch(err) {
        next(err)
    }
}