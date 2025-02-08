import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const getHeaderToken = () => {
  let token = localStorage.getItem('token');
  if (token) {
    token = atob(token);
    return `Bearer ${token}`;
  }
  return null;
};

const handleAPIError = (e) => e.response?.data?.message || e.message || e.code || 'Internal Server erorr';

export const loginUser = async(params) => {
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

export const getAuthUser = async() => {
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

export const validateImageUrl = async(url) => {
  try {
    const response = await axios.head(url);

    if (!response || !response.headers) {
      throw new Error('No response headers');
    }

    const contentType = response.headers['content-type'];

    if (contentType && contentType.startsWith('image/')) {
      return { isValid: true };
    }
    return { isValid: false, message: 'The provided URL is not an image' };
  } catch {
    return { isValid: false, message: 'Invalid image URL or resource not found' };
  }
};

export async function postUser(username, email, password, image) {
  try {
    const response = await fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
        image: image,
        channel: [],
      }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const data = await response.json();
    console.log('User Created:', data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getUsers() {
  try {
    const response = await fetch('http://localhost:3000/user/signin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to find any user!');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

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

