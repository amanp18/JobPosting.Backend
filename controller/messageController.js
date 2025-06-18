import messageModel from "../model/messageModel";
import userModel from "../model/userModel";

export const sendmessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    if (!receiverId || !content)
      return res.status(400).json({
        success: false,
        message: "receiver and message content required",
      });
    const receiver = await userModel.findById(receiverId);
    if (!receiver)
      return res
        .status(404)
        .json({ success: false, message: "receiver not exist" });
    const messge = new messageModel({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });
    await messge.save();
    res
      .status(201)
      .json({ success: true, message: "message sent", data: messge });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "errror in server", error });
  }
};

export const getconversation = async (req, res) => {
  try {
    const withUserId = req.params.withUserId;
    const userId = req.user._id;
    const messages = await messageModel
      .find({
        $or: [
          { sender: userId, receiver: withUserId },
          { sender: withUserId, receiver: userId },
        ], 
      })
      .sort({ createdAt: 1 }); // optional: sort by time
    res.status(200).json({
      success: true,
      total: messages.length,
      messages,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "errror in server", error });
  }
};
