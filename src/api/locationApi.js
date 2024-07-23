import axios from 'axios';

const apiKey = import.meta.env.VITE_NINJAS_API_KEY;

const apiClient = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1', // 替换为你的 API 基础 URL
  headers: {
    'Content-Type': 'application/json',
    'X-Api-Key': apiKey,
  },
});

export const getDegrees = (city) => {
  return apiClient.get(`/geocoding?city=${city}`);
};

export const getWeather = (lat, lon) => {
  return apiClient.get(`/weather?lat=${lat}&lon=${lon}`);
};
