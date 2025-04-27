export default class HttpClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  // Helper to build the full URL
  _buildUrl(url) {
    return `${this.baseURL}${url}`;
  }

  // Helper to add authorization header
  _getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  async get(url, config = {}) {
    return this._request(this._buildUrl(url), {
      method: 'GET',
      ...config,
      headers: {
        ...this._getHeaders(),
        ...config.headers,
      },
    });
  }

  async post(url, data = {}, config = {}) {
    return this._request(this._buildUrl(url), {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
      headers: {
        ...this._getHeaders(),
        ...config.headers,
      },
    });
  }

  async put(url, data = {}, config = {}) {
    return this._request(this._buildUrl(url), {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
      headers: {
        ...this._getHeaders(),
        ...config.headers,
      },
    });
  }

  async delete(url, config = {}) {
    return this._request(this._buildUrl(url), {
      method: 'DELETE',
      ...config,
      headers: {
        ...this._getHeaders(),
        ...config.headers,
      },
    });
  }

  // Handle Data and Errors for requests
  async _request(url, options) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          ok: false,
          error: errorData.message || `Error ${response.status}`,
        };
      }

      // Check if response is empty
      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      return { ok: true, data };
    } catch (error) {
      if (error.name === 'AbortError') {
        // eslint-disable-next-line no-console
        console.warn('[Solicitud cancelada]');
        throw new Error('AbortError');
      }

      return {
        ok: false,
        error: 'Could not connect with server',
      };
    }
  }
}
