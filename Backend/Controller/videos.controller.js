import videoModel from '../Model/videos.Model.js';

export async function GetVideos(req, res) {
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
    const videoDetails = await videoModel.find();

    if (!videoDetails || videoDetails.length === 0) {
      return res.status(404).send({ message: 'No videos found!' });
    }

    const updatedVideos = videoDetails.map((video) => ({
      ...video._doc,
      uploadDate: setDate(video.uploadDate),
      views: setViews(video.views),
    }));

    res.status(200).send(updatedVideos);
  } catch (error) {
    res.status(500).send({ message: 'An error occurred', error: error.message });
  }
}

export function createVideo(req, res) {
  const {
    title, thumbnailUrl, description, channelId, uploader, views, likes, dislikes, uploadDate, comments,
  } = req.body;

  if (!thumbnailUrl || !title) {
    return res.status(400).json({ message: 'Title and thumbnail URL are required' });
  }

  const newVideo = new videoModel({
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
}
