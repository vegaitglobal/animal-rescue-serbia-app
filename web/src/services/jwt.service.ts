import jwt_decode from 'jwt-decode';
import storageApi from './storage.service';

interface IJwtObject {
  email: string;
  exp: number;
  family_name: string;
  iat: number;
  name: string;
  nbf: number;
  role: string[];
}

const decodeJwtToken = (accessToken: string) => {
  if (!accessToken) return null;
  return jwt_decode<IJwtObject>(accessToken);
};

const isAdmin = () => {
  const token = storageApi.getToken();
  if (!token) return false;
  const decoded = decodeJwtToken(token);
  return decoded && decoded.role.includes('Admin');
};

const jwtTokenApi = {
  decodeToken: decodeJwtToken,
  isAdmin: isAdmin,
};

export default jwtTokenApi;
