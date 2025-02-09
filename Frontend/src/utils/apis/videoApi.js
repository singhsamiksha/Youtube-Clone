import axios from 'axios';
import { baseUrl, getHeaderToken, handleAPIError } from '../apis';

export const getDashboardVideos = async (params) => {
  const { setters } = params;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const response = await axios.get(`${baseUrl}/video/dashboard`, {
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
