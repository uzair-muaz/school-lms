import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const fetchUsers = async (page, limit) => {
//   const { data } = await axios.get(
//     `http://localhost:3000/api/users?page=${page}&limit=${limit}`
//   );
//   return data;
// };

const useUsers = (page, limit) => {
  return {
    data: {
      data: [
        {
          id: 1,
          name: "John Doe",
          department: "HR",
          joiningDate: "2023-06-15",
          email: "john@example.com",
          status: "Active",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 2,
          name: "Jane Smith",
          department: "IT",
          joiningDate: "2022-03-22",
          email: "jane@example.com",
          status: "Inactive",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 3,
          name: "Alice Johnson",
          department: "Finance",
          joiningDate: "2021-09-10",
          email: "alice@example.com",
          status: "Active",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 4,
          name: "Bob Brown",
          department: "Marketing",
          joiningDate: "2020-12-05",
          email: "bob@example.com",
          status: "Active",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 5,
          name: "Charlie White",
          department: "Sales",
          joiningDate: "2019-07-30",
          email: "charlie@example.com",
          status: "Inactive",
          image: "https://via.placeholder.com/150",
        },
        {
          id: 6,
          name: "David Black",
          department: "Support",
          joiningDate: "2018-04-17",
          email: "david@example.com",
          status: "active",
          image: "https://via.placeholder.com/150",
        },
      ],
      meta: { total: 6, page: 1, limit: 6 },
    },
    isLoading: false,
    error: null,
  };
};

export default useUsers;
