import privateAxiosClient from '../configs/httpClient/privateAxiosClient';
import { removeLocalAccessToken } from '../utils/token';
import { AxiosResponse } from 'axios';

const baseAuthUrl = '/auth';
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
    return privateAxiosClient.post(`${baseAuthUrl}/signup`, {
      name,
      email,
      password,
    });
  }

  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<any, any>> {
    return privateAxiosClient.post(`${baseAuthUrl}/signin`, {
      email,
      password,
    });
  }

  static async logout() {
    return privateAxiosClient
      .get(`${baseAuthUrl}/logout`)
      .then(() => removeLocalAccessToken());
  }
}
