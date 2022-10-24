type RequestMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export type RequestConfig = {
  url: string;
  method: RequestMethod;
  data?: any;
  headers?: Record<string, string>;
  apiVersion?: string;
};

export type ApiRequest = {
  baseURL: string;
  url: string;
  method: RequestMethod;
  headers: Record<string, string>;
  data?: any;
};
export type AuthorizationResult = Partial<{
  accessToken: string;
}>;

export interface IAuthManager {
  signIn: () => Promise<AuthorizationResult>;
  signOut: () => Promise<void>;
  getAccessToken: () => Promise<string | undefined>;
}

export interface INavigationService {
  navigate: (name: string, props?: any) => void;
  resetToRoute: (name: string) => void;
}

export interface IApiClient {
  request: <TReturn>(config: RequestConfig) => Promise<TReturn>;
  nonAuthenticatedRequest: <TReturn>(config: RequestConfig) => Promise<TReturn>;
  formRequest: <TReturn>(config: RequestConfig) => Promise<TReturn>;
}
