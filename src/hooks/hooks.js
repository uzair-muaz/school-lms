import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { privateRequest } from "../services/axiosInstance";
import { message } from "antd";
import {
  fetchAssignments,
  fetchAssignmentsById,
  fetchAssignmentsDetailsById,
} from "../apis/assignmentsApi";
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
import {
  approveLetter,
  declineLetter,
  fetchLetters,
  initiateLetter,
  reRequestLetter,
} from "../apis/letterApi";

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
    queryFn: () => fetchAssignmentsDetailsById(id),
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

// -------------- Reference Letter -------------------

export const useFetchLetters = (page = 1, limit = 4) => {
  return useQuery({
    queryKey: ["letters", page, limit],
    queryFn: () => fetchLetters(page, limit),
    keepPreviousData: true,
  });
};

// Initiate Letter Hook (POST)
export const useInitiateLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ letterData }) => initiateLetter(letterData),
    onSuccess: () => {
      message.success("Letter initiated successfully!");
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to initiate letter",
      );
    },
  });
};

// Decline Letter Hook (POST)
export const useDeclineLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => declineLetter(id),
    onSuccess: () => {
      message.success("Letter declined successfully!");
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to decline letter",
      );
    },
  });
};

// Re-request Letter Hook (POST)
export const useReRequestLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => reRequestLetter(id),
    onSuccess: () => {
      message.success("Letter re-requested successfully!");
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to re-request letter",
      );
    },
  });
};

// Approve Letter Hook (POST)
export const useApproveLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }) => approveLetter(id, formData),
    onSuccess: () => {
      message.success("Letter approved successfully!");
      queryClient.invalidateQueries({ queryKey: ["letters"] });
    },
    onError: (error) => {
      message.error(
        error.response?.data?.message || "Failed to approve letter",
      );
    },
  });
};
