import axios, { AxiosResponse } from 'axios';
import { env } from '../utils/env';

interface Payload {
  [key: string]: any;
}

const baseRoute = env.API_URL;

const withApiRoute = (url: string): string => `${baseRoute}/api/${url}`;

console.error({ baseRoute });
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
