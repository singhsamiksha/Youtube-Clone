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
    const videoDetails = await VideoModel.find().populate([
      { path: 'channel' },
      { path: 'uploadedBy' },
    ]).lean();

    if (!videoDetails || videoDetails.length === 0) {
      return res.status(404).send({ message: 'No videos found!' });
    }

    const updatedVideos = videoDetails.map((video) => ({
      ...video,
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
      { path: 'comments.userId', select: 'username email likedBy dislikedBy timestamp' },
    ]).lean();

  return res.json({
    data: {
      video: {
        ...video,
        comments: (video.comments || []).sort((b, a) => a.timestamp - b.timestamp),
        uploadedBy: {
          name: video?.uploadedBy?.username,
        },
      },
    },
  });
};

VideoController.addVideoComment = async (req, res) => {
  const { user } = req;
  const { videoId } = req.params;
  const { commentText } = req.body;

  if (!videoId) {
    return res.status(403).json({ message: 'Invalid data provided' });
  }

  let video = await VideoModel.findOne({ _id: videoId });

  if (!video) {
    return res.status(403).json({
      message: 'Invalid resource provided',
    });
  }

  await VideoModel.findOneAndUpdate(video._id, {
    $push: {
      comments: {
        userId: user._id,
        text: commentText,
      },
    },
  });

  video = await VideoModel.findOne({ _id: videoId }).populate([
    { path: 'comments.userId', select: 'username email likedBy dislikedBy timestamp' },
  ]);

  const comments = (video.comments || [])
    .filter((comment) => comment?.userId)
    .sort((b, a) => a.timestamp - b.timestamp);

  return res.json({
    data: {
      comments,
    },
  });
};

VideoController.toggleVideoLike = async (req, res) => {
  const { user } = req;
  const { videoId } = req.params;
  const { like } = req.body;

  if (!videoId) {
    return res.status(403).json({ message: 'Invalid data provided' });
  }

  let video = await VideoModel.findOne({ _id: videoId });

  if (!video) {
    return res.status(403).json({
      message: 'Invalid resource provided',
    });
  }

  const userId = user._id;

  const updateQuery = like
    ? {
      $addToSet: { likedBy: userId },
      $pull: { dislikedBy: userId },
    }
    : {
      $addToSet: { dislikedBy: userId },
      $pull: { likedBy: userId },
    };

  await VideoModel.findOneAndUpdate(video._id, updateQuery);

  video = await VideoModel.findOne({ _id: videoId });

  return res.json({
    data: {
      likedBy: video.likedBy,
      dislikedBy: video.dislikedBy,
    },
  });
};

VideoController.toggleCommentLike = async (req, res) => {
  const { user } = req;
  const { videoId, commentId } = req.params;
  const { like } = req.body;

  if (!videoId) {
    return res.status(403).json({ message: 'Invalid data provided' });
  }

  let video = await VideoModel.findOne({ _id: videoId });

  if (!video) {
    return res.status(403).json({
      message: 'Invalid resource provided',
    });
  }

  const userId = user._id;

  const updateQuery = like
    ? {
      $addToSet: { 'comments.$.likedBy': userId },
      $pull: { 'comments.$.dislikedBy': userId },
    }
    : {
      $addToSet: { 'comments.$.dislikedBy': userId },
      $pull: { 'comments.$.likedBy': userId },
    };

  await VideoModel.findOneAndUpdate(
    { _id: videoId, 'comments._id': commentId },
    updateQuery,
  );

  video = await VideoModel.findOne({ _id: videoId }).populate([
    { path: 'comments.userId', select: 'username email likedBy dislikedBy timestamp' },
  ]);

  const comments = (video.comments || [])
    .filter((comment) => comment?.userId)
    .sort((b, a) => a.timestamp - b.timestamp);

  return res.json({
    data: { comments },
  });
};

VideoController.deleteComment = async (req, res) => {
  const { user } = req;
  const { videoId, commentId } = req.params;

  if (!videoId) {
    return res.status(403).json({ message: 'Invalid data provided' });
  }

  let video = await VideoModel.findOne({ _id: videoId });

  if (!video) {
    return res.status(403).json({
      message: 'Invalid resource provided',
    });
  }

  const updatedVideo = await VideoModel.findOneAndUpdate(
    { _id: videoId, 'comments._id': commentId, 'comments.userId': user._id },
    { $pull: { comments: { _id: commentId } } },
    { new: true },
  );

  if (!updatedVideo) {
    return res.status(404).json({ message: 'Comment not found or unauthorized' });
  }

  video = await VideoModel.findOne({ _id: videoId }).populate([
    { path: 'comments.userId', select: 'username email likedBy dislikedBy timestamp' },
  ]);

  const comments = (video.comments || [])
    .filter((comment) => comment?.userId)
    .sort((b, a) => a.timestamp - b.timestamp);

  return res.json({
    data: { comments },
  });
};

VideoController.editComment = async (req, res) => {
  const { user } = req;
  const { videoId, commentId } = req.params;
  const { commentText } = req.body;

  if (!videoId) {
    return res.status(403).json({ message: 'Invalid data provided' });
  }

  let video = await VideoModel.findOne({ _id: videoId });

  if (!video) {
    return res.status(403).json({
      message: 'Invalid resource provided',
    });
  }

  const updatedVideo = await VideoModel.updateOne(
    { _id: videoId },
    {
      $set: {
        'comments.$[elem].text': commentText,
      },
    },
    {
      arrayFilters: [{ 'elem._id': commentId, 'elem.userId': user._id }],
      new: true,
    },
  );

  if (!updatedVideo) {
    return res.status(404).json({ message: 'Comment not found or unauthorized' });
  }

  video = await VideoModel.findOne({ _id: videoId }).populate([
    { path: 'comments.userId', select: 'username email likedBy dislikedBy timestamp' },
  ]);

  const comments = (video.comments || [])
    .filter((comment) => comment?.userId)
    .sort((b, a) => a.timestamp - b.timestamp);

  return res.json({
    data: { comments },
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
