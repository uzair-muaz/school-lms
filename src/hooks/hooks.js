import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateRequest } from "../services/axiosInstance";
import { message } from "antd";
import { fetchAssignments, fetchAssignmentsById } from "../apis/assignmentsApi";
import {
  createCourse,
  deleteCourse,
  fetchAssignedCourses,
  fetchCourseById,
  fetchCourses,
  fetchUsers,
  updateCourse,
} from "../apis/courseApi";
import { fetchAdminUsers } from "../apis/userApi";

// --------- Assignments ------------
export const useCreateAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ formData }) =>
      privateRequest.post("/assignment", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      message.success("Assignment created successfully!");
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to create assignment",
      );
    },
  });
};
export const useSubmitAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) =>
      privateRequest.patch(`/assignment/submit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      message.success("Assignment submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to submit assignment",
      );
    },
  });
};
export const useGradeAssignment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, studentId, value }) =>
      privateRequest.patch(`/assignment/grade/${id}/${studentId}`, value),
    onSuccess: () => {
      message.success("Assignment submitted successfully!");
      queryClient.invalidateQueries({ queryKey: ["assignments"] }); // Refresh assignments list
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to submit assignment",
      );
    },
  });
};

export const useAssignments = (page, limit) => {
  return useQuery({
    queryKey: ["assignments", page, limit],
    queryFn: () => fetchAssignments(page, limit),
    keepPreviousData: true,
  });
};

export const useAssignmentById = (id) => {
  return useQuery({
    queryKey: ["assignments", id],
    queryFn: () => fetchAssignmentsById(id),
  });
};
export const useAssignmentDetailById = (id) => {
  return useQuery({
    queryKey: ["assignments", "detail", id],
    queryFn: () => fetchAssignmentsById(id),
  });
};

// --------- Course ------------

export const useCourses = (page, limit) => {
  return useQuery({
    queryKey: ["course", page, limit],
    queryFn: () => fetchCourses(page, limit),
    keepPreviousData: true,
  });
};

export const useCourse = (courseId) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => fetchCourseById(courseId),
    enabled: !!courseId,
  });
};

export const useAssignedCourses = () => {
  return useQuery({
    queryKey: ["course", "assigned"],
    queryFn: () => fetchAssignedCourses(),
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }) => deleteCourse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course"],
      });
    },
    onError: (error) => {
      console.error("error", error);
      message.error(`Failed to delete course. Please try again later.`);
    },
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ courseData }) => createCourse(courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course"],
      });
    },
    onError: (error) => {
      console.error("error", error);
      message.error(`Failed to delete course. Please try again later.`);
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, courseData }) => updateCourse(id, courseData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["course"],
      });
    },
    onError: (error) => {
      console.error("error", error);
      message.error(`Failed to delete course. Please try again later.`);
    },
  });
};

// ------------------ Users -------------------------

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
  });
};

export const useAdminUsers = (page, limit) => {
  return useQuery({
    queryKey: ["users", "admin", page, limit],
    queryFn: () => fetchAdminUsers(page, limit),
  });
};
