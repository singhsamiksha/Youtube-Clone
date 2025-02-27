import mongoose from 'mongoose';
import UserModel from './users.model.js';
import ChannelModel from './channels.model.js';

const videoSchema = new mongoose.Schema({
  videoUrl: {
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
    type: Number,
    required: true,
    default: 0,
  },
  category: { type: String, required: true },
  channel: { type: mongoose.Types.ObjectId, ref: ChannelModel, required: true },
  uploadedBy: { type: mongoose.Types.ObjectId, ref: UserModel, required: true },
  likedBy: [{ type: mongoose.Types.ObjectId, ref: UserModel, required: true }],
  dislikedBy: [{ type: mongoose.Types.ObjectId, ref: UserModel, required: true }],
  comments: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: UserModel, required: true },
      text: String,
      likedBy: [{
        type: mongoose.Types.ObjectId, ref: UserModel, required: true, default: [],
      }],
      dislikedBy: [{
        type: mongoose.Types.ObjectId, ref: UserModel, required: true, default: [],
      }],
      timestamp: {
        type: Date,
        default: () => Date.now(),
      },
    },
  ],
}, {
  timestamps: true,
});

const VideoModel = mongoose.model('Videos', videoSchema);

export default VideoModel;
