import { privateRequest } from "../services/axiosInstance";

export const getDashboard = async () => {
  const response = await privateRequest.get("/dashboard");
  return response.data.data;
};
