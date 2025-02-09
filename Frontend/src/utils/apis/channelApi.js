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

export const getChannels = () => {

};
