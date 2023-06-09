import { API_BASE_URL } from '../utils/constants';
import publicAxiosClient from '../configs/httpClient/publicAxiosClient';
import privateAxiosClient from '../configs/httpClient/privateAxiosClient';
import { removeLocalAccessToken, setLocalAccessToken } from '../utils/token';

export default class AuthServices {
  static async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    return publicAxiosClient.post(`/signup`, {
      name,
      email,
      password,
    });
  }

  static async login({ email, password }: { email: string; password: string }) {
    return publicAxiosClient
      .post(`/signin`, { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          setLocalAccessToken(JSON.stringify(response.data));
        }
      });
  }

  static async logout() {
    privateAxiosClient.get(`/logout`).then(() => removeLocalAccessToken());
  }
}
