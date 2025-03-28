// src/pages/UsersPage.js
import { useState } from "react";
import { Button, Pagination, Spin } from "antd";
import UserCard from "../components/UserCard";
import UserModal from "../components/UserModal";
import { useAdminUsers } from "../hooks/hooks";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const limit = 10;
  const { data, isLoading, error } = useAdminUsers(page, limit);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spin size="large" className="mt-10 flex justify-center" />
      </div>
    );
  if (error)
    return (
      <div className="bg-white p-5">
        <p>Failed to load users</p>;
      </div>
    );

  console.log("data", data);
  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button type="primary" size="large" onClick={showModal}>
          + Add New User
        </Button>
      </div>
      <div className="mb-6 grid grid-cols-3 gap-6">
        {data?.data.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <Pagination
        current={page}
        pageSize={limit}
        align="end"
        showTotal={(total) => `Total ${total} items`}
        total={data?.meta.total || 50}
        onChange={(p) => setPage(p)}
      />
      <UserModal visible={isModalVisible} onCancel={handleCancel} />
    </div>
  );
};

export default UsersPage;
