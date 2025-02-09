import mongoose from 'mongoose';
import UserModel from './users.model.js';
import ChannelModel from './channels.Model.js';

const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  views: {
    type: String,
    required: true,
  },
  channel: { type: mongoose.Types.ObjectId, ref: ChannelModel, required: true },
  uploadedBy: { type: mongoose.Types.ObjectId, ref: UserModel, required: true },
  likedBy: [{ type: mongoose.Types.ObjectId, ref: UserModel, required: true }],
  dislikeBy: [{ type: mongoose.Types.ObjectId, ref: UserModel, required: true }],
  uploadDate: Date,
  comments: [
    {
      commentId: String,
      userId: String,
      text: String,
      timestamp: String,
    },
  ],
});

const VideoModel = mongoose.model('Videos', videoSchema);

export default VideoModel;
