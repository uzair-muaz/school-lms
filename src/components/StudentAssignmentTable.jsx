import React, { useState } from "react";
import { Button, Table, Tag } from "antd";
import { AiTwotoneEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAssignments } from "../hooks/hooks";
import StudentAssignmentModal from "./StudentAssignmentModal";

const StudentAssignmentTable = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
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
      title: "Grading Criteria",
      dataIndex: "gradingCriteria",
      key: "gradingCriteria",
    },
    {
      title: "Late Submission Allowed",
      dataIndex: "isAllowLateSubmission",
      key: "isAllowLateSubmission",
      render: (allowLate) => (allowLate ? "Yes" : "No"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "pending" ? "yellow" : "green"}
          style={{ padding: "8px 16px", width: "100%", textAlign: "center" }}
          className="capitalize"
        >
          {status === "pending" ? "Open" : "Closed"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setSelectedAssignment(record);
              setVisible(true);
            }}
            type="text"
            icon={<AiTwotoneEye />}
            className="!bg-blue-100 !text-blue-500 hover:!bg-blue-200"
          />
        </>
      ),
    },
  ];

  return (
    <>
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

      {selectedAssignment && (
        <StudentAssignmentModal
          visible={visible}
          onClose={() => setVisible(false)}
          assignmentId={selectedAssignment.id}
        />
      )}
    </>
  );
};

export default StudentAssignmentTable;
