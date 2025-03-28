import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCourseById, fetchCourses, updateCourse } from "../apis/courseApi";

import { useMutation } from "@tanstack/react-query";

// Mutation to update an existing course
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, courseData }) => updateCourse(id, courseData),
    onSuccess: (data) => {
      console.log("Course updated successfully:", data);
      queryClient.invalidateQueries({ queryKey: ["course"] });
      // Optionally, you can trigger a refetch or refresh here
    },
    onError: (error) => {
      console.error("Error updating course:", error);
    },
  });
};

// Fetch a specific course by ID for editing
