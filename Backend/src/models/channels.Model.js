import mongoose from 'mongoose';
import UserModel from './users.model.js';

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  channelBanner: {
    type: String,
    required: true,
  },
  // There will be users id who will subscribe to this channel
  subscribers: [
    { type: mongoose.Types.ObjectId, ref: UserModel, required: true },
  ],
  // There will be youtube video URLs that belongs to this channel
  videos: [
    { type: String },
  ],
});

const ChannelModel = mongoose.model('Channels', channelSchema);

export default ChannelModel;
