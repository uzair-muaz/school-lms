import { Table, Tag } from "antd";
import { useState } from "react";
import { useAssignments } from "../hooks/hooks";

const AssignmentTable = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useAssignments(page, 10);

  if (error) return <p>Error loading assignments.</p>;

  const columns = [
    { title: "Assignment Name", dataIndex: "title", key: "title" },
    { title: "Subject", dataIndex: "courseName", key: "courseName" },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Total Submissions",
      dataIndex: "submissionCount",
      key: "submissionCount",
    },
    {
      title: "Avg. Grade",
      dataIndex: "averageGrade",
      key: "averageGrade",
      render: (grade) => (grade !== null ? `${grade}%` : "N/A"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "active" ? "yellow" : "red"}
          style={{ padding: "8px 16px", width: "100%", textAlign: "center" }}
          className="capitalize"
        >
          {status === "active" ? "open" : "closed"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          className="!bg-blue-100 !text-blue-500 hover:!bg-blue-200"
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      loading={isPending}
      dataSource={data?.data}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: 4,
        total: data?.meta?.total,
        onChange: (newPage) => setPage(newPage),
      }}
    />
  );
};

export default AssignmentTable;
