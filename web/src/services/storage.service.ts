const storeAccessToken = (token: string) => {
  if (token.length < 1) return;
  localStorage.setItem('accessToken', token);
};

const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

const clearAccessToken = () => {
  localStorage.removeItem('accessToken');
};

const storageApi = {
  storeToken: storeAccessToken,
  getToken: getAccessToken,
  clearToken: clearAccessToken,
};

export default storageApi;
