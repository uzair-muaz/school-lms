import React from "react";
import { Modal, Typography, List, Button, Upload, Form, message } from "antd";
import { AiOutlineDownload } from "react-icons/ai";
import { useAssignmentById, useSubmitAssignment } from "../hooks/hooks";
import { FaRegFileLines } from "react-icons/fa6";
import { GoFile } from "react-icons/go";
import { TiTickOutline } from "react-icons/ti";

const StudentAssignmentModal = ({ visible, onClose, assignmentId }) => {
  const [form] = Form.useForm();
  const { data: assignmentDetails, isPending } =
    useAssignmentById(assignmentId);
  const { data } = assignmentDetails ?? {};

  const submitAssignment = useSubmitAssignment();
  const onFinish = async (values) => {
    if (!values.file || values.file.fileList.length === 0) {
      message.error("Please upload a file!");
      return;
    }
    const formData = new FormData();
    if (values.file) {
      values.file.fileList.forEach((file) => {
        formData.append("file", file.originFileObj);
      });
    }
    try {
      await submitAssignment.mutateAsync({
        id: assignmentId,
        formData: formData,
      });
      message.success("Assignment uploaded successfully");
      form.resetFields();
      onClose();
    } catch (error) {
      console.log("error", error);
      message.error("Failed to submit assignment!");
    }
  };

  return (
    <Modal
      title="Assignment Details"
      centered
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      {isPending && <div>Loading...</div>}
      {data ? (
        <>
          <div className="mt-5 grid grid-cols-3 gap-5">
            <FieldValue title={"Assignment Title"} value={data?.title} />
            <FieldValue title={"Description"} value={data?.description} />
            <FieldValue
              title={"Due Date"}
              value={new Date(data.dueDate).toLocaleDateString()}
            />
            <FieldValue title={"Created By"} value={data?.createdBy} />
            <FieldValue
              title={"Grading Criteria"}
              value={data?.gradingCriteria}
            />
            <FieldValue
              title={"Late Submission Allowed"}
              value={data?.isAllowLateSubmission ? "Yes" : "No"}
            />

            <List
              dataSource={data?.assignmentBriefUrl}
              renderItem={(url) => (
                <List.Item>
                  <Button
                    type="text"
                    href={url}
                    target="_blank"
                    className="!border-blue-500 !bg-blue-50 !px-10 !py-7 !text-blue-500"
                  >
                    <GoFile className="text-3xl" /> Assignment Brief
                  </Button>
                </List.Item>
              )}
            />
          </div>

          {data.status !== "pending" ? (
            <div>
              <p className="flex items-center gap-1 text-green-500">
                <TiTickOutline className="text-xl" />
                Your assignment has already been submitted!
              </p>
            </div>
          ) : (
            <div>
              <Form
                requiredMark={false}
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <div className="mt-5">
                  <Form.Item
                    name="file"
                    rules={[
                      { required: true, message: "Please select a file!" },
                    ]}
                    valuePropName="file"
                    getValueFromEvent={(e) => e}
                  >
                    <Upload.Dragger beforeUpload={() => false} maxCount={1}>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single upload. Strictly prohibited from
                        uploading personal data or other banned files.
                      </p>
                    </Upload.Dragger>
                  </Form.Item>
                </div>
                <div className="flex justify-end">
                  <Button type="primary" htmlType="submit">
                    Upload
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </>
      ) : (
        <p>No assignment details available</p>
      )}
    </Modal>
  );
};

export default StudentAssignmentModal;

const FieldValue = ({ title, value }) => (
  <div>
    <p>{title}</p>
    <p className="text-[#545A70]">{value}</p>
  </div>
);
