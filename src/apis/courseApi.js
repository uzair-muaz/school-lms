import { privateRequest } from "../services/axiosInstance";

export const fetchUsers = async () => {
  const { data } = await privateRequest.get(`/users?page=${1}&limit=${999999}`);
  return data;
};

export const fetchCourses = async (page = 1, limit = 4) => {
  const response = await privateRequest.get(
    `/course?page=${page}&limit=${limit}`,
  );
  return response.data;
};
export const fetchAssignedCourses = async () => {
  const response = await privateRequest.get(`/course/assigned`);
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await privateRequest.post("/course", courseData);
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await privateRequest.patch(`/course/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await privateRequest.delete(`/course/${id}`);
  return response.data;
};

// Fetch course by ID
export const fetchCourseById = async (id) => {
  const response = await privateRequest.get(`/course/${id}`);
  return response.data;
};
