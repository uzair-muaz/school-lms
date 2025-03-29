import { privateRequest } from "../services/axiosInstance";

export const fetchAdminUsers = async (page, limit) => {
  const { data } = await privateRequest.get(
    `/user/details?page=${page}&limit=${limit}`,
  );
  return data;
};
