import axios, { AxiosResponse } from 'axios';

interface Payload {
  [key: string]: any;
}

const withApiRoute = (url: string): string => `/api/${url}`;

const get = <T>(url: string, params?: Payload): Promise<T> => {
  return axios
    .get(withApiRoute(url), params)
    .then((response: AxiosResponse) => response.data);
};

const post = <T>(url: string, data: Payload): Promise<T> => {
  return axios
    .post(withApiRoute(url), data)
    .then((response: AxiosResponse) => response.data);
};

const put = <T>(url: string, data: Payload): Promise<T> => {
  return axios
    .put(withApiRoute(url), data)
    .then((response: AxiosResponse) => response.data);
};

const remove = <T>(url: string): Promise<T> => {
  return axios
    .delete(withApiRoute(url))
    .then((response: AxiosResponse) => response.data);
};

export { get, post, put, remove };
