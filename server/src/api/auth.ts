import axios, { AxiosResponse } from 'axios';
import { HOST, CLIENT_ID, CLIENT_SECRET } from '../config';

export type AuthResponse = {
  access_token: string;
  expires_in: number;
  queries_log?: [];
  token_type?: string;
};

export const getAccessToken = (): Promise<AxiosResponse<AuthResponse>> => {
  return axios.post(`${HOST}/oauth2/auth`, {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'client_credentials',
  });
};
