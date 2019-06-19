import httpHandler from 'utils/httpHandler';
import { API } from 'config';

class CoreApiService {
  static async request({
    method,
    url,
    useAuthorization = true,
    useApiEndpoint = true,
    headers = {},
    ...rest
  }) {
    const requestHeaders = { ...headers };

    if (useAuthorization) {
      requestHeaders.Authorization = `Bearer ${CoreApiService.getToken()}`;
    }

    return httpHandler.request({
      method,
      url: `${useApiEndpoint ? API : ''}${url}`,
      headers: requestHeaders,
      ...rest,
    });
  }

  static async get({ url, ...params }) {
    return CoreApiService.request({
      method: 'GET',
      url,
      ...params,
    });
  }

  static async post({ url, data = {}, ...params }) {
    return CoreApiService.request({
      method: 'POST',
      data,
      url,
      ...params,
    });
  }

  static async put({ url, data = {}, ...params }) {
    return CoreApiService.request({
      method: 'PUT',
      data,
      url,
      ...params,
    });
  }

  static async patch({ url, data = {}, ...params }) {
    return CoreApiService.request({
      method: 'PATCH',
      data,
      url,
      ...params,
    });
  }

  static async delete({ url, ...params }) {
    return CoreApiService.request({
      method: 'DELETE',
      url,
      ...params,
    });
  }
}

export default CoreApiService;
