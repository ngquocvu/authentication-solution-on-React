import { getLocalAccessToken } from '../utils/token';

export default function authHeader() {
  const accessToken = getLocalAccessToken();
  if (accessToken) {
    return { Authorization: 'Bearer ' + accessToken };
  } else return {};
}
