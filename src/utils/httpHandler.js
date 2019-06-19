import axios from 'axios';

const HTTP_UNAUTHORIZED = 401;

export const registerLogoutInterceptor = logoutCallback => {
  return axios.interceptors.response.use(null, error => {
    if (error.response && error.response.status === HTTP_UNAUTHORIZED) {
      logoutCallback();
    }

    return Promise.reject(error);
  });
};

export const unregisterInterceptor = interceptorId => {
  return axios.interceptors.response.eject(interceptorId);
};

export default axios;
