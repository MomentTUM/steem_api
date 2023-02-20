const fs = require("fs");
const { Chat } = require("../models");
const cloudinary = require("../util/cloudinary");

exports.createChat = async (req, res, next) => {
  try {
    const value = req.body;
    value.senderId = req.params.senderId;
    value.receiverId = req.params.receiverId;

    value.messageImage = await cloudinary.upload(req.file?.path, null);

    const result = await Chat.create(value);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
