const Profile = require("../../models/Profile");
const { sendEmail } = require("../../services/mailer");

const index = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.user_id });
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    const requesting = await User.findOne({ _id: req.user.id });

    if (!profile) return res.status(400).json({ msg: "Profile not found" });
    if (
      profile.network.filter(like => like.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "Already send a network request" });
    }
    const newRequest = {
      user: requesting.id,
      name: requesting.name,
      avatar: requesting.avatar
    };
    profile.network.unshift(newRequest);
    const mailToUser = {
      to: user.email,
      subject: `${req.user.name} send you a network request`,
      body: `${req.user.name} send you a network request
      go to your network section to accept or reject the request`
    };
    await profile.save();
    sendEmail(mailToUser);
    res.json(profile.network);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteNetworkRequest = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    if (
      profile.network.filter(friend => friend.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Haven't send a request yet" });
    }
    const removeIndex = profile.network
      .map(like => like.user.toString())
      .indexOf(req.user.id);
    profile.network.splice(removeIndex, 1);
    await profile.save();
    res.json(profile.network);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { index, deleteNetworkRequest };
