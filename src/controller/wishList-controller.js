const {WishList} = require("../models")
const createError = require("../util/createError")

exports.addWishList = async (req, res, next) => {
    try {
        const {gameId, profileId} = req.params
        // console.log(req.params)
        const wishList = await WishList.findOne({
            where: {
                profileId: profileId,
                gameId: gameId
            }
        })
        if (wishList) {
            createError("This user already have this game")
        }
        const result = WishList.create({
            profileId: profileId,
            gameId: gameId
        })
        res.status(200).json({ result })
    } catch(err) {
        next(err)
    }
}

exports.deleteWishList = async (req, res, next) => {
    try {
        const {wishlistId,profileId} = req.params
        const wishList = await WishList.findOne({
            where: {
                id: wishlistId
            }
        })
        if (!wishList.dataValues.id) {
            createError("You not have this wish list", 400)
        }
        if (wishList.dataValues.profileId !== +profileId) {
            createError("You not have permission to delete wish list", 400)
        }
        await WishList.destroy({where : {id: wishList.dataValues.id}})
        res.status(204).json({ wishList })
    } catch(err) {
        next(err)
    }
}