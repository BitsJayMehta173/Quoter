import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Note API calls
export const noteAPI = {
  // Get all notes
  getAllNotes: async () => {
    const response = await api.get('/notes');
    return response.data;
  },

  // Get single note
  getNote: async (id) => {
    const response = await api.get(`/notes/${id}`);
    return response.data;
  },

  // Create note
  createNote: async (noteData) => {
    const response = await api.post('/notes', noteData);
    return response.data;
  },

  // Update note
  updateNote: async (id, noteData) => {
    const response = await api.put(`/notes/${id}`, noteData);
    return response.data;
  },

  // Delete note
  deleteNote: async (id) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
  },
};

export default api;
