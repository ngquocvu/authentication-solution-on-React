import authHeader from './authHeader';
import privateAxiosClient from '../configs/httpClient/privateAxiosClient';

class MessageServices {
  static async getAllMessage() {
    return privateAxiosClient.get(`/message`, {
      headers: authHeader(),
    });
  }
}

export default MessageServices;
