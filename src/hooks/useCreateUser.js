import { useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { privateRequest } from "../services/axiosInstance";

const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData) =>
      privateRequest.post("/user", userData, {
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      message.success("User created successfully!");
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Refresh users list
    },
    onError: (error) => {
      message.error(error.response?.data?.message || "Failed to create user");
    },
  });
};

export default useCreateUser;
