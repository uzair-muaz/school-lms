import React, { useState } from "react";
import { Button, Table, Tag } from "antd";
import { useAssignmentDetailById } from "../hooks/hooks";
import { useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import GradeAssignmentModal from "./GradeAssignmentModal"; // Import the modal

const AssignmentDetailsTable = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const {
    data: assignmentDetails,
    isPending,
    error,
  } = useAssignmentDetailById(id);

  // Modal control state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSubmissionUrl, setSelectedSubmissionUrl] = useState(null);
  const [studentId, setStudentId] = useState(null);

  // Show modal
  const handleActionClick = (submissionUrl, studentId) => {
    setSelectedSubmissionUrl(submissionUrl);
    setStudentId(studentId);
    setIsModalVisible(true);
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  if (error) return <p>Error loading assignments.</p>;

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentFullName",
      key: "studentFullName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "unsubmitted" ? "red" : "green"}
          style={{
            padding: "8px 16px",
            width: "100%",
            textAlign: "center",
          }}
          className="capitalize"
        >
          {status === "unsubmitted" ? "Unsubmitted" : "Submitted"}
        </Tag>
      ),
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (grade) => (grade !== null ? `${grade}%` : "N/A"),
    },
    {
      title: "Submission URL",
      dataIndex: "submissionUrl",
      key: "submissionUrl",
      render: (url) =>
        url.length > 0 ? (
          <a href={url[0]} target="_blank" rel="noopener noreferrer">
            View Submission
          </a>
        ) : (
          "No submission"
        ),
    },
    {
      title: "Submission Date",
      dataIndex: "submittedAt",
      key: "submittedAt",
      render: (date) =>
        date ? new Date(date).toLocaleDateString() : "Not submitted",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          onClick={() =>
            handleActionClick(record.submissionUrl, record.studentId)
          }
          type="text"
          icon={<CiEdit className="text-xl" />}
          className="!bg-blue-100 !text-blue-500 hover:!bg-blue-200"
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        loading={isPending}
        dataSource={assignmentDetails?.data}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: 4,
          total: assignmentDetails?.meta?.total,
          onChange: (newPage) => setPage(newPage),
        }}
      />
      {/* Modal for grading assignment */}
      <GradeAssignmentModal
        visible={isModalVisible}
        onCancel={handleModalCancel}
        submissionUrl={selectedSubmissionUrl}
        assignmentId={id}
        studentId={studentId}
      />
    </>
  );
};

export default AssignmentDetailsTable;
