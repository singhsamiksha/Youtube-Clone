import DataHelper from '../helpers/data.js';
import ErrorUtil from '../helpers/error.js';
import VideoModel from '../models/videos.Model.js';

const VideoController = {};
export default VideoController;

VideoController.getVideosForUserDashboard = async (req, res) => {
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
      uploadDate: DataHelper.humanizeTime(video.uploadDate || video.createdAt),
      views: DataHelper.humanizeViews(video.views),
    }));

    return res.status(200).json({
      data: {
        videos: updatedVideos,
      },
    });
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

VideoController.getVideoDetails = async (req, res) => {
  try {
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
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

VideoController.addVideoComment = async (req, res) => {
  try {
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
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

VideoController.toggleVideoLike = async (req, res) => {
  try {
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
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

VideoController.handleVideoView = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(403).json({ message: 'Invalid data provided' });
    }

    const video = await VideoModel.findOne({ _id: videoId });

    if (!video) {
      return res.status(403).json({
        message: 'Invalid resource provided',
      });
    }

    video.views += 1;
    await video.save();

    return res.json({
      data: { views: video.views },
    });
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

VideoController.toggleCommentLike = async (req, res) => {
  try {
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
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

VideoController.deleteComment = async (req, res) => {
  try {
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
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
};

VideoController.editComment = async (req, res) => {
  try {
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
  } catch (error) {
    return ErrorUtil.APIError(error, res);
  }
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
