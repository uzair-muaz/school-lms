import { useQuery } from "@tanstack/react-query";
import {
  createCourse,
  deleteCourse,
  fetchCourseById,
  fetchCourses,
  fetchUsers,
  updateCourse,
} from "../apis/courseApi";

import { useMutation } from "@tanstack/react-query";

export const useCreateCourse = () => {
  return useMutation({
    mutationFn: createCourse,
    onSuccess: (data) => {
      console.log("Course created successfully:", data);
      // Optionally, you can trigger a refetch or refresh here
    },
    onError: (error) => {
      console.error("Error creating course:", error);
    },
  });
};

// Mutation to update an existing course
export const useUpdateCourse = () => {
  return useMutation({
    mutationFn: updateCourse,
    onSuccess: (data) => {
      console.log("Course updated successfully:", data);
      // Optionally, you can trigger a refetch or refresh here
    },
    onError: (error) => {
      console.error("Error updating course:", error);
    },
  });
};

// Mutation to delete a course
export const useDeleteCourse = () => {
  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: (data) => {
      console.log("Course deleted successfully:", data);
      // Optionally, you can trigger a refetch or refresh here
    },
    onError: (error) => {
      console.error("Error deleting course:", error);
    },
  });
};

// Fetch teachers data
export const useUsers = () => {
  return useQuery(["users"], fetchUsers);
};

// Fetch a specific course by ID for editing
export const useCourses = (page, limit) => {
  return useQuery({
    queryKey: ["course", page, limit],
    queryFn: () => fetchCourses(page, limit),
    keepPreviousData: true,
  });
};

export const useCourse = (courseId) => {
  return useQuery(["course", courseId], () => fetchCourseById(courseId), {
    enabled: !!courseId, // Only run the query if the courseId is available
  });
};
