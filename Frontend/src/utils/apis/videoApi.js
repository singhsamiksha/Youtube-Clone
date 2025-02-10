import axios from 'axios';
import { baseUrl, getHeaderToken, handleAPIError } from '../apis';

export const getDashboardVideos = async (params) => {
  const { payload, setters } = params;
  const { search } = payload;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const query = new URLSearchParams({ search });
    const response = await axios.get(`${baseUrl}/video/dashboard${search ? `?${query.toString()}` : ''}`, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      const { videos } = response.data.data;
      onSuccessHandler(videos);
    }
  } catch (e) {
    setError(handleAPIError(e));
  } finally {
    setLoader(false);
  }
};

export const fetchVideo = async (params) => {
  const { payload, setters } = params;
  const { videoId } = payload;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const response = await axios.get(`${baseUrl}/video/${videoId}`, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      const { video } = response.data.data;
      onSuccessHandler(video);
    }
  } catch (e) {
    setError(handleAPIError(e));
  } finally {
    setLoader(false);
  }
};

export const postCommentForVideoAPI = async (params) => {
  const { payload, setters } = params;
  const { videoId, commentText } = payload;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const response = await axios.post(`${baseUrl}/video/${videoId}/comment`, { commentText }, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      const { comments } = response.data.data;
      onSuccessHandler(comments);
    }
  } catch (e) {
    setError(handleAPIError(e));
  } finally {
    setLoader(false);
  }
};

export const toggleVideoLikeAPI = async (params) => {
  const { payload, setters } = params;
  const { videoId, like } = payload;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const response = await axios.put(`${baseUrl}/video/${videoId}/like`, { like }, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      onSuccessHandler(response.data.data);
    }
  } catch (e) {
    setError(handleAPIError(e));
  } finally {
    setLoader(false);
  }
};

export const markVideoViewAPI = async (params) => {
  const { payload, setters } = params;
  const { videoId } = payload;
  const { setError, onSuccessHandler } = setters;

  try {
    const token = getHeaderToken();
    const response = await axios.put(`${baseUrl}/video/${videoId}/view`, {}, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      onSuccessHandler();
    }
  } catch (e) {
    setError(handleAPIError(e));
  }
};

export const toggleCommentLikeAPI = async (params) => {
  const { payload, setters } = params;
  const { videoId, commentId, like } = payload;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const response = await axios.put(`${baseUrl}/video/${videoId}/comment/${commentId}/like`, { like }, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      const { comments } = response.data.data;
      onSuccessHandler(comments);
    }
  } catch (e) {
    setError(handleAPIError(e));
  } finally {
    setLoader(false);
  }
};

export const deleteCommentAPI = async (params) => {
  const { payload, setters } = params;
  const { videoId, commentId } = payload;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const response = await axios.delete(`${baseUrl}/video/${videoId}/comment/${commentId}`, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      const { comments } = response.data.data;
      onSuccessHandler(comments);
    }
  } catch (e) {
    setError(handleAPIError(e));
  } finally {
    setLoader(false);
  }
};

export const editCommentAPI = async (params) => {
  const { payload, setters } = params;
  const { videoId, commentId, commentText } = payload;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const response = await axios.put(`${baseUrl}/video/${videoId}/comment/${commentId}`, { commentText }, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      const { comments } = response.data.data;
      onSuccessHandler(comments);
    }
  } catch (e) {
    setError(handleAPIError(e));
  } finally {
    setLoader(false);
  }
};

export const uploadVideo = async (params) => {
  const { payload, setters } = params;
  const {
    youtubeURL,
    videoTitle,
    videoDescription,
    videoThumbnailURL,
    videoCategory,
    channelId,
  } = payload;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const response = await axios.post(`${baseUrl}/channel/${channelId}/video`, {
      youtubeURL,
      videoTitle,
      videoDescription,
      videoThumbnailURL,
      videoCategory,
    }, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      onSuccessHandler();
    }
  } catch (e) {
    setError(handleAPIError(e));
  } finally {
    setLoader(false);
  }
};
