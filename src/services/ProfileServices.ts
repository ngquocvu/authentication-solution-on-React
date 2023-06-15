import privateAxiosClient from '../configs/httpClient/privateAxiosClient';

export class ProfileServices {
  static async getCurrentProfile() {
    return privateAxiosClient.get('/user/me');
  }
}
