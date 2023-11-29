const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv

router.post("/", async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;

  try {
    // Check if a conversation already exists with the given members
    const existingConversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      // If a conversation already exists, return it without creating a new one
      return res.status(200).json(existingConversation);
    }

    // If no existing conversation, create a new one
    const newConversation = new Conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});


//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
