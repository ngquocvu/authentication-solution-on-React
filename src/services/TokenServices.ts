import publicAxiosClient from '../configs/httpClient/publicAxiosClient';
import { setLocalAccessToken } from '../utils/token';
import { store } from '../redux/store';
import { updateAccessToken } from '../redux/slices/AuthSlice';
export default class TokenServices {
  static async updateRefreshToken() {
    try {
      const response = await publicAxiosClient.get(`auth/refresh`);
      const { accessToken } = response.data;
      if (accessToken) {
        setLocalAccessToken(accessToken);
        store.dispatch(
          updateAccessToken({ accessToken: accessToken, isLogin: true })
        );
      } else throw new Error('accessToken is null');
    } catch (e) {
      throw new Error('Refresh Token is expired');
    }
  }
}
