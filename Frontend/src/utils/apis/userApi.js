import axios from 'axios';
import { baseUrl, getHeaderToken, handleAPIError } from '../apis';

export const registerUser = async (params) => {
  const { payload, setters } = params;
  const {
    setError,
    onSuccessHandler,
  } = setters;
  try {
    const { email, password } = payload;
    const response = await axios.post(`${baseUrl}/user/signup`, {
      ...payload,
      email: window.btoa(email),
      password: window.btoa(password),
      confirmPassword: undefined,
    });

    if (response?.data?.data) {
      const { user, token } = response.data.data;
      localStorage.setItem('token', btoa(token));
      onSuccessHandler({ user });
    }
  } catch (e) {
    setError(handleAPIError(e));
  }
};

export const loginUser = async (params) => {
  const { payload, setters } = params;
  const {
    setError,
    onSuccessHandler,
  } = setters;
  try {
    const { email, password } = payload;
    const response = await axios.post(`${baseUrl}/user/signin`, {
      email: window.btoa(email),
      password: window.btoa(password),
    });

    if (response?.data?.data) {
      const { user, token } = response.data.data;
      localStorage.setItem('token', btoa(token));
      onSuccessHandler({ user });
    }
  } catch (e) {
    setError(handleAPIError(e));
  }
};

export const getAuthUser = async () => {
  try {
    const token = getHeaderToken();
    if (token) {
      const response = await axios.get(`${baseUrl}/user/auth`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.data) {
        const { user } = response.data.data;
        return user;
      }
    }
  } catch {
    localStorage.removeItem('token');
  }
  return null;
};

export const validateSignForm1 = async (params) => {
  const { payload, setters } = params;
  const { onSuccesHandler, setLoader } = setters;
  try {
    setLoader(true);
    const response = await axios.post(`${baseUrl}/user/register/validate1`, payload);

    if (response.data.data) {
      onSuccesHandler(response.data.data);
    }
    setLoader(false);
  } catch (e) {
    setLoader(false);
  }
};
