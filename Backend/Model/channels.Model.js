import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelId: Number,
    channelName: String, 
    owner: String, 
    description: String,
    channelBanner: URL,
    subscribers: Number, 
    videos: Array
});

const channelModel = mongoose.model("Channels", channelSchema);

export default channelModel;