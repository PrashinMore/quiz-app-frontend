import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => api.post("/users/login", credentials);
export const register = (userData) => api.post("/users/register", userData);
export const selectTopics = (topics) => api.post("/topics/select", { topics });
export const getQuestions = (topic) => api.get(`/questions/${topic}`);
export const submitScore = (scoreData) => api.post("/scores", scoreData);
export const getLeaderboard = () => api.get("/leaderboard");

export default api;
