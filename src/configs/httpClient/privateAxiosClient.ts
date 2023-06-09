import axios, { AxiosHeaders } from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { getLocalAccessToken } from '../../utils/token';
import TokenServices from '../../services/TokenServices';

const privateAxiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

privateAxiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = getLocalAccessToken();
    if (accessToken) {
      (config.headers as AxiosHeaders).set(
        'Authorization',
        `Bearer ${accessToken}`
      );
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateAxiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error?.config;
    if (
      error?.response?.status === 401 &&
      originalConfig &&
      !originalConfig.sent
    ) {
      try {
        originalConfig.sent = true;
        TokenServices.updateRefreshToken();
        return privateAxiosClient(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default privateAxiosClient;
