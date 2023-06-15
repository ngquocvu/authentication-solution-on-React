import axios, { AxiosHeaders } from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { getLocalAccessToken, removeLocalAccessToken } from '../../utils/token';
import TokenServices from '../../services/TokenServices';
import { updateAccessToken } from '../../redux/slices/AuthSlice';
import { store } from '../../redux/store';

const privateAxiosClient = axios.create({
  withCredentials: true,
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
        await TokenServices.updateRefreshToken();
        return privateAxiosClient(originalConfig);
      } catch (_error) {
        store.dispatch(
          updateAccessToken({ accessToken: null, isLogin: false })
        );
        removeLocalAccessToken();
        return Promise.reject(_error);
      }
    }
    store.dispatch(updateAccessToken({ accessToken: null, isLogin: false }));
    removeLocalAccessToken();
    return Promise.reject(error);
  }
);

export default privateAxiosClient;
