import { privateRequest } from "../services/axiosInstance";

export const fetchAssignments = async (page = 1, limit = 4) => {
  const { data } = await privateRequest.get(
    `/assignment?page=${page}&limit=${limit}`,
  );
  return data;
};

export const fetchAssignmentsById = async (id) => {
  const { data } = await privateRequest.get(`/assignment/${id}`);
  return data;
};
export const fetchAssignmentsDetailsById = async (id) => {
  const { data } = await privateRequest.get(`/assignment/details/${id}`);
  return data;
};
