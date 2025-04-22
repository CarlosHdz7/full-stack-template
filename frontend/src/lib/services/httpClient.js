import axios from 'axios';

export default class HttpClient {
  constructor(baseURL = '') {
    this.client = axios.create({ baseURL });

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add interceptor for expired sessions
  }

  async get(url, config = {}) {
    return this._request(() => this.client.get(url, config));
  }

  async post(url, data = {}, config = {}) {
    return this._request(() => this.client.post(url, data, config));
  }

  async put(url, data = {}, config = {}) {
    return this._request(() => this.client.put(url, data, config));
  }

  async delete(url, config = {}) {
    return this._request(() => this.client.delete(url, config));
  }

  // Handle Data and Errors for requests
  async _request(requestFn) {
    try {
      const response = await requestFn();
      return { ok: true, data: response.data };
    } catch (error) {
      if (axios.isCancel(error)) {
        // eslint-disable-next-line no-console
        console.warn('[Solicitud cancelada]');
        throw new Error('AbortError');
      }

      let message = 'Uknown Error';

      if (error.response) {
        message = error.response.data?.message || `Error ${error.response.status}`;
      } else if (error.request) {
        message = 'Could not connect with server';
      } else {
        message = error.message;
      }
      return { ok: false, error: message };
    }
  }
}
