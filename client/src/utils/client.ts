import axios, { type AxiosRequestConfig } from "axios";

interface IConfig<T> extends AxiosRequestConfig<T> {
  token?: string;
}

export function client<T = any>(
  endpoint: string,
  { token, headers: customHeaders, data, ...customConfig }: IConfig<T> = {}
) {
  const config = {
    headers: { Authorization: `Bearer ${token}`, ...customHeaders },
    method: data ? "POST" : "GET",
    url: endpoint,
    data,
    ...customConfig,
  };

  return axios(config);
}
