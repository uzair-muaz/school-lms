import React, { useState } from "react";
import { Table, Tag, Button, Modal, Upload, Form, message, Input } from "antd";
import {
  useApproveLetter,
  useDeclineLetter,
  useFetchLetters,
} from "../hooks/hooks";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

const statusColors = {
  pending: "!bg-yellow-50 !text-yellow-500 !border-yellow-500",
  approved: "!bg-green-50 !text-green-500 !border-green-500",
  denied: "!bg-red-50 !text-red-500 !border-red-500",
};
const ReferenceLetter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [page, setPage] = useState(1);
  const { data, isPending } = useFetchLetters(page, 10);

  const [form] = Form.useForm();

  const declineLetter = useDeclineLetter();
  const approveLetter = useApproveLetter();
  const handleAccept = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleDecline = async (record) => {
    try {
      await declineLetter.mutateAsync({
        id: record.id,
      });
      message.success("Letter request declined successfully!");
    } catch (error) {
      message.error("Failed to decline the letter request. Please try again.");
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

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
      await approveLetter.mutateAsync({
        id: selectedRecord.id,
        formData: formData,
      });
      handleCancel();
    } catch (error) {
      console.log("error", error);
      message.error("Failed to approve the letter request!");
    }
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: ["createdBy", "firstName"], // Access first name from 'createdBy'
      key: "name",
      render: (text, record) =>
        `${record.createdBy.firstName} ${record.createdBy.lastName}`, // Concatenate first and last name
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Requested Date",
      dataIndex: "createdAt", // Access 'createdAt' for date
      key: "date",
      render: (text) => new Date(text).toLocaleDateString(), // Format date
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className={`rounded-lg !px-2 !py-1 ${statusColors[status]} capitalize`}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => handleAccept(record)}
              className={`${record.status === "pending" && "!border-green-500 !bg-green-100 !text-green-500"}`}
              disabled={record.status !== "pending"}
            />
            <Button
              type="default"
              onClick={() => {
                handleDecline(record);
              }}
              danger
              icon={<CloseCircleOutlined />}
              disabled={record.status !== "pending"}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data?.data}
        pagination={{
          current: page,
          pageSize: 4,
          total: data?.meta?.total,
          onChange: (newPage) => setPage(newPage),
        }}
        loading={isPending}
      />

      {/* Upload File Modal */}
      <Modal
        title="Upload Reference Letter"
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          requiredMark={false}
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="mt-5">
            <Form.Item
              name="file"
              rules={[{ required: true, message: "Please select a file!" }]}
              valuePropName="file"
              getValueFromEvent={(e) => e}
            >
              <Upload.Dragger beforeUpload={() => false} maxCount={1}>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Upload.Dragger>
            </Form.Item>
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              loading={approveLetter.isPending}
              type="primary"
              htmlType="submit"
            >
              Upload
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ReferenceLetter;
