import { privateRequest } from "../services/axiosInstance";

export const fetchLetters = async (page = 1, limit = 4) => {
  const response = await privateRequest.get(
    `/reference?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const initiateLetter = async (letterData) => {
  const response = await privateRequest.post("/reference", letterData);
  return response.data;
};

export const declineLetter = async (id) => {
  const response = await privateRequest.patch(`/reference/decline/${id}`);
  return response.data;
};

export const reRequestLetter = async (id) => {
  const response = await privateRequest.patch(`/reference/rerequest/${id}`);
  return response.data;
};

export const approveLetter = async (id, formData) => {
  const response = await privateRequest.patch(
    `/reference/approve/${id}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};
