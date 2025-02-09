import axios from 'axios';
import { baseUrl, getHeaderToken, handleAPIError } from '../apis';

export async function createChannelAPI(params) {
  const { payload, setters } = params;
  const { setLoader, onSuccess, setError } = setters;
  try {
    setLoader(true);

    const response = await axios.post(`${baseUrl}/channel`, payload, {
      headers: {
        contentType: 'application/json',
        Authorization: getHeaderToken(),
      },
    });

    if (response?.data?.data) {
      const { channels } = response.data.data;
      onSuccess(channels);
    }

    setLoader(false);
  } catch (error) {
    setError(handleAPIError(error));
  } finally {
    setLoader(false);
  }
}

export const getChannels = async (params) => {
  const { payload, setters } = params;
  const { channelId } = payload;
  const { setError, setLoader, onSuccessHandler } = setters;

  try {
    setLoader(true);
    const token = getHeaderToken();
    const response = await axios.get(`${baseUrl}/channel/${channelId}`, {
      headers: {
        Authorization: token,
      },
    });

    if (response?.data?.data) {
      const { channel } = response.data.data;
      onSuccessHandler(channel);
    }
  } catch (e) {
    setError(handleAPIError(e));
  } finally {
    setLoader(false);
  }
};
