// In a file like src/contexts/AxiosInstance.ts
import axios from 'axios';

const token = import.meta.env.VITE_APP_API_KEY; // Make sure the environment variable is correctly set

const axiosInstance = axios.create({
  baseURL: 'https://www.carboninterface.com/api/v1',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
