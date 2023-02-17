const {Op} = require("sequelize")
const {Friend} = require("../models")
const createError = require("../util/createError")
const {FRIEND_ACCEPTER, FRIEND_PENDING} = require("../config/constant")

exports.requestFriend = async (req, res, next) => {
    try {
        // console.log(req.params.userId)
        if (req.user.id === +req.params.userId) {
            createError("cannot request yourself")
        }
        const existFriend = await Friend.findOne({
            where: {
                [Op.or]: [
                    {requesterId: req.params.userId, accepterId: req.user.id},
                    {requesterId: req.user.id, accepterId: req.params.userId}
                ]
            }
        })
        if (existFriend) {
            createError("Already friend or pending")
        }
        await Friend.create({
            requesterId: req.user.id,
            accepterId: req.params.userId,
            status: FRIEND_PENDING
        })
        res.status(200).json({message: "success friend request"})
    } catch(err) {
        next(err)
    }
}