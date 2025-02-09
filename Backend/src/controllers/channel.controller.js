import ChannelModel from '../models/channels.Model.js';
import UserModel from '../models/users.model.js';

const ChannelController = {};
export default ChannelController;

const getUserChannels = (user) => {
  const { _id: userId } = user || {};
  return ChannelModel.find({ owner: userId });
};

// Controller to create a new channel
ChannelController.channelCreate = async (req, res) => {
  const { user } = req;
  const { channelName, description, channelBanner } = req.body;

  if (!channelName || !description || !channelBanner) {
    return res.status(422).json({ message: 'Invalid data provided' });
  }

  const newChannel = new ChannelModel({
    channelName,
    owner: user?._id,
    description,
    channelBanner,
    subscribers: [],
    videos: [],
  });

  await newChannel.save();

  await UserModel.findByIdAndUpdate(user._id, {
    $addToSet: {
      channels: newChannel._id,
    },
  });

  const channels = await getUserChannels(user);

  return res.json({
    data: { channels },
  });
};
