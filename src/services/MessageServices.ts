import privateAxiosClient from '../configs/httpClient/privateAxiosClient';

class MessageServices {
  static async getAllMessage() {
    return privateAxiosClient.get(`/message`);
  }
}

export default MessageServices;
