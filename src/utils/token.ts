export function getLocalAccessToken() {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
}
export function setLocalAccessToken(accessToken: string) {
  localStorage.setItem('accessToken', accessToken);
}
export function removeLocalAccessToken() {
  localStorage.removeItem('accessToken');
}
