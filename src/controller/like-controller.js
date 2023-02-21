const {Like} = require("../models")
const createError = require("../util/createError")

exports.createLike = async (req, res, next) => {
    try {
        console.log(req.params.gameId)
        const existLike = await Like.findOne({
            where: {
                userId: req.params.userId,
                gameId: req.params.gameId
            }
        })

        if (existLike) {
            createError("This user already have like this game", 400)
        }
        const newLike = await Like.create({
            userId: req.params.userId,
            gameId: req.params.gameId
        })

        res.status(200).json({ newLike })
    } catch(err) {
        next(err)
    }
}

exports.unlike = async (req, res, next) => {
    try {
        const existLike = await Like.findOne({
            where: {
                userId: req.params.userId,
                gameId: req.params.gameId
            }
        })
        if (!existLike) {
            createError("You cannot unlike this game", 400)
        }
        await existLike.destroy()
        res.status(200).json()
    } catch(err) {
        next(err)
    }
}