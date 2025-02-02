import { Axios } from 'axios';

export const axiosClient = new Axios({
  baseURL: process.env.REACT_APP_API_BASE_URL
});

console.log('baseURL', process.env.REACT_APP_API_BASE_URL);