import axios from 'axios';
import { API_URL } from 'config';
import { store } from 'store';
import { Logout } from 'store/reducers/auth';

const axiosServices = axios.create();

axiosServices.interceptors.request.use(
  (config: any) => {
    config.baseURL = API_URL;
    const state = store.getState() as any;
    const accessToken = state.auth.token;
    if (accessToken) {
      config.headers['x-auth-token'] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      store.dispatch(Logout({}));
    }
    return Promise.reject(error);
  }
);

export default axiosServices;
