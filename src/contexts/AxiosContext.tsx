// AxiosContext.tsx
import React from 'react';
import axiosInstance from './AxiosInstance'; // Import the instance

const AxiosContext = React.createContext(axiosInstance);

export default AxiosContext;
