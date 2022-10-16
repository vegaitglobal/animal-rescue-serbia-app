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

const hasAccessToken = () => {
  return !!getAccessToken();
};

const storageApi = {
  storeToken: storeAccessToken,
  getToken: getAccessToken,
  clearToken: clearAccessToken,
  hasToken: hasAccessToken,
};

export default storageApi;
