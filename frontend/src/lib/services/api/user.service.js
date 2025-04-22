import { apiClient } from './index';

const path = '/users';

export const fetchUsers = () => {
  return apiClient.get(path);
};

export const fetchUserById = (id) => {
  return apiClient.get(`${path}/${id}`);
};

export const createUser = (data) => {
  return apiClient.post(path, data);
};

export const updateUser = (id, data) => {
  return apiClient.put(`${path}/${id}`, data);
};

export const deleteUser = (id) => {
  return apiClient.delete(`${path}/${id}`);
};
