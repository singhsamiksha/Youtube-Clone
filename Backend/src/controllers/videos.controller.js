import VideoModel from '../models/videos.Model.js';

const VideoController = {};
export default VideoController;

VideoController.getVideosForUserDashboard = async (req, res) => {
  function setDate(date) {
    const now = new Date();
    const uploadedDate = new Date(date);
    const timeDiff = Math.floor((now - uploadedDate) / 1000); // Difference in seconds

    if (timeDiff < 60) {
      return `${timeDiff} mins ago`;
    } if (timeDiff < 3600) {
      return `${Math.floor(timeDiff / 60)} hours ago`;
    } if (timeDiff < 86400) {
      return `${Math.floor(timeDiff / 3600)} days ago`;
    }
    return `${Math.floor(timeDiff / 86400)} years ago`;
  }

  function setViews(views) {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }

  try {
    const videoDetails = await VideoModel.find();

    if (!videoDetails || videoDetails.length === 0) {
      return res.status(404).send({ message: 'No videos found!' });
    }

    const updatedVideos = videoDetails.map((video) => ({
      ...video.toObject(),
      uploadDate: setDate(video.uploadDate),
      views: setViews(video.views),
    }));

    res.status(200).json({
      data: {
        videos: updatedVideos,
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred', error: error.message });
  }
  return null;
};

VideoController.getVideoDetails = async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    return res.status(403).json({ message: 'Invalid data provided' });
  }

  const video = await VideoModel.findOne({ _id: videoId })
    .populate([
      { path: 'channel' },
      { path: 'uploadedBy' },
    ]).lean();

  return res.json({
    data: {
      video: {
        ...video,
        uploadedBy: {
          name: video?.uploadedBy?.username,
        },
      },
    },
  });
};

VideoController.createVideo = (req, res) => {
  const {
    title, thumbnailUrl, description, channelId, uploader, views, likes, dislikes, uploadDate, comments,
  } = req.body;

  if (!thumbnailUrl || !title) {
    return res.status(400).json({ message: 'Title and thumbnail URL are required' });
  }

  const newVideo = new VideoModel({
    title,
    thumbnailUrl,
    description,
    channelId,
    uploader,
    views: views || 0, // Default value if not provided
    likes: likes || 0,
    dislikes: dislikes || 0,
    uploadDate: uploadDate || new Date(),
    comments: comments || [],
  });

  newVideo
    .save()
    .then((data) => res.status(201).json(data))
    .catch((error) => res.status(500).json({ message: 'Internal server error', error: error.message }));

  return null;
};
