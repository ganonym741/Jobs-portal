import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { toast } from 'sonner';

import { getToken } from '../../lib/auth';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Handle response body
const responseBody = (response: AxiosResponse) => {
  if (response.data) {
      const status = response.status;
      let message = response.data.message;
      const noToast = response.config.params?.noToast;

      if (!noToast) {
        if (status >= 200 && status < 400) {
          toast.success(message);
        } else {
          if (typeof message !== 'string') {
            message = 'Invalid Validation Form';
          }

          toast.error(message);
        }
      }
  }

  return response.data;
};

axios.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const request = {
  get: (url: string, params?: any) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body?: any) => axios.post(url, body).then(responseBody),
  upload: (url: string, body?: any) =>
    axios
      .post(url, body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(responseBody),
  put: (url: string, body: any) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.post(url).then(responseBody),
};

export default request;
