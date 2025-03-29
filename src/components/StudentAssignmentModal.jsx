import React from "react";
import { Modal, Typography, List, Button } from "antd";
import { AiOutlineDownload } from "react-icons/ai";
import { useAssignmentById } from "../hooks/hooks";

const { Text, Title } = Typography;

const StudentAssignmentModal = ({ visible, onClose, assignmentId }) => {
  const { data, isPending } = useAssignmentById(assignmentId);

  return (
    <Modal
      title="Assignment Details"
      centered
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={800}
    >
      {isPending && <div>Loading...</div>}
      {data ? (
        <div>
          <Title level={4}>{data.title}</Title>
          <Text strong>Description: </Text>
          <p>{data.description}</p>
          <Text strong>Due Date: </Text>
          <p>{new Date(data.dueDate).toLocaleDateString()}</p>
          <Text strong>Created By: </Text>
          <p>{data.createdBy}</p>
          <Text strong>Grading Criteria: </Text>
          <p>{data.gradingCriteria}%</p>
          <Text strong>Late Submission Allowed: </Text>
          <p>{data.isAllowLateSubmission ? "Yes" : "No"}</p>
          <Text strong>Assignment Brief:</Text>
          <List
            dataSource={data.assignmentBriefUrl}
            renderItem={(url) => (
              <List.Item>
                <Button
                  type="link"
                  href={url}
                  target="_blank"
                  icon={<AiOutlineDownload />}
                >
                  Download Assignment Brief
                </Button>
              </List.Item>
            )}
          />
        </div>
      ) : (
        <p>No assignment details available</p>
      )}
    </Modal>
  );
};

export default StudentAssignmentModal;
