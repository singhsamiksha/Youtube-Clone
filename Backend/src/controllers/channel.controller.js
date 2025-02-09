import ErrorUtil from '../helpers/error.js';
import ChannelModel from '../models/channels.Model.js';
import UserModel from '../models/users.model.js';
import VideoModel from '../models/videos.Model.js';

const ChannelController = {};
export default ChannelController;

const getUserChannels = (user) => {
  const { _id: userId } = user || {};
  return ChannelModel.find({ owner: userId });
};

// Controller to create a new channel
ChannelController.channelCreate = async (req, res) => {
  try {
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
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

ChannelController.getChannel = async (req, res) => {
  try {
    const { user } = req;
    const { channelId } = req.params;

    const channel = await ChannelModel.findOne({
      _id: channelId,
      owner: user._id,
    }).populate(
      {
        path: 'videos',
        populate: {
          path: 'uploadedBy',
          select: 'email username',
        },
      },
    );

    if (!channel) {
      return ErrorUtil.resourceNotFound(res);
    }

    return res.json({
      data: { channel },
    });
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

ChannelController.addVideoToChannel = async (req, res) => {
  try {
    const { user } = req;
    const { channelId } = req.params;
    const {
      youtubeURL,
      videoTitle,
      videoDescription,
      videoThumbnailURL,
      videoCategory,
    } = req.body;

    const channel = await ChannelModel.findOne({
      _id: channelId,
      owner: user._id,
    });

    if (!channel) {
      return ErrorUtil.resourceNotFound(res);
    }

    const video = await VideoModel.create({
      videoUrl: youtubeURL,
      title: videoTitle,
      thumbnailUrl: videoThumbnailURL,
      description: videoDescription,
      channel,
      uploadedBy: user._id,
      likedBy: [],
      dislikedBy: [],
      comments: [],
      category: videoCategory,
    });

    channel.videos.push(video._id);

    await channel.save();

    return res.json({
      data: true,
    });
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};
