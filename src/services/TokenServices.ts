import publicAxiosClient from '../configs/httpClient/publicAxiosClient';
import { API_BASE_URL } from '../utils/constants';
import { setLocalAccessToken, removeLocalAccessToken } from '../utils/token';

export default class TokenServices {
  static async updateRefreshToken() {
    try {
      const response = await publicAxiosClient.get(`/refresh`);
      const { accessToken } = response.data;
      if (accessToken) {
        setLocalAccessToken(accessToken);
      } else throw new Error('accessToken is null');
    } catch (e) {
      removeLocalAccessToken();
    }
  }
}
