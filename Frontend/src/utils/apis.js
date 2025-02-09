import axios from 'axios';
import { APPErrorUtil } from './common';

export const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const getHeaderToken = () => {
  let token = localStorage.getItem('token');
  if (token) {
    token = atob(token);
    return `Bearer ${token}`;
  }
  return null;
};

export const handleAPIError = (e) => e.response?.data?.message || e.message || e.code || 'Internal Server erorr';

export const validateImageUrl = async (url) => {
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
    return { isValid: true, message: 'Invalid image URL or resource not found' };
  }
};

export const embedYouTube = async (url) => {
  try {
    const response = await axios.get(`https://www.youtube.com/oembed?url=${url}&format=json`);

    if (response.status === 200 && response?.data?.title) {
      return {
        title: response?.data?.title,
        thumnailURL: response.data.thumbnail_url,
      };
    }

    return null;
  } catch {
    return null;
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
        username,
        email,
        password,
        image,
        channel: [],
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to create user');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    APPErrorUtil('Error:', error);
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
    APPErrorUtil('Error fetching users:', error);
    return [];
  }
}
