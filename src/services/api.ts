import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (userData: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: { username: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  changePassword: async (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },
};

// Posts API
export const postsAPI = {
  getAllPosts: async () => {
    const response = await api.get('/posts');
    return response.data;
  },

  getPostById: async (id: string) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  getMyPosts: async () => {
    const response = await api.get('/posts/user/my-posts');
    return response.data;
  },

  createPost: async (postData: {
    title: string;
    description: string;
    images: string[];
    contact: string;
  }) => {
    const response = await api.post('/posts', postData);
    return response.data;
  },

  updatePost: async (id: string, postData: {
    title?: string;
    description?: string;
    images?: string[];
    contact?: string;
    status?: 'available' | 'reserved' | 'donated';
  }) => {
    const response = await api.put(`/posts/${id}`, postData);
    return response.data;
  },

  deletePost: async (id: string) => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};

export default api;
