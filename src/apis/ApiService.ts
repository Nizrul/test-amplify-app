import { axiosClient } from './util';

export const getRecords = async () => {
  const response = await axiosClient.get('user');
  return response;
};

export const setRecords = async () => {
  return 'This function does nothing yet';
};
