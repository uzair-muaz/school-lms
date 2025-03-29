import React from "react";
import { Modal, Button, Input, Space, Tag, Form, message } from "antd";
import { IoMdDownload } from "react-icons/io";
import { useGradeAssignment } from "../hooks/hooks";

const GradeAssignmentModal = ({
  visible,
  onCancel,
  submissionUrl,
  assignmentId,
  studentId,
}) => {
  const [form] = Form.useForm();

  const gradeAssignment = useGradeAssignment();
  const handleDownload = () => {
    if (submissionUrl && submissionUrl.length > 0) {
      const fileUrl = submissionUrl[0];
      const a = document.createElement("a");
      a.href = fileUrl;
      a.download = fileUrl.split("/").pop();
      a.click();
    }
  };

  const handleSubmit = async (values) => {
    try {
      const gradeValue = parseInt(values.grade, 10);

      if (!Number.isInteger(gradeValue)) {
        message.error("Please enter a valid integer grade");
        return;
      }

      await gradeAssignment.mutateAsync({
        id: assignmentId,
        studentId: studentId,
        value: {
          grade: gradeValue,
        },
      });

      form.resetFields();
      onCancel();
      message.success("Assignment graded successfully!");
    } catch (error) {
      console.log("error", error);
      message.error("Failed to grade the assignment.");
    }
  };

  return (
    <Modal
      title="Grade Assignment"
      open={visible}
      centered
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div>
          {submissionUrl && submissionUrl.length > 0 ? (
            <Space direction="vertical">
              <Button icon={<IoMdDownload />} onClick={handleDownload}>
                Download Submission
              </Button>
              <Tag color="blue" style={{ cursor: "pointer" }}>
                View Submission
              </Tag>
            </Space>
          ) : (
            <p>No file available for download</p>
          )}

          <div style={{ marginTop: "20px" }}>
            <Form.Item
              name="grade"
              label="Grade"
              rules={[
                {
                  required: true,
                  message: "Please enter a grade",
                },
                {
                  pattern: /^\d*\.?\d*$/,
                  message: "Please enter a valid number",
                },
              ]}
            >
              <Input placeholder="Enter grade" style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <div className="mt-5 flex justify-end">
            <Space>
              <Button key="back" onClick={onCancel}>
                Cancel
              </Button>
              <Button key="submit" type="primary" htmlType="submit">
                Grade Assignment
              </Button>
            </Space>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default GradeAssignmentModal;
