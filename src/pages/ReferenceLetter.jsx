import React, { useState } from "react";
import { Table, Tag, Button, Modal, Upload, Form, message, Input } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const statusColors = {
  Pending: "!bg-yellow-50 !text-yellow-500 !border-yellow-500",
  Approved: "!bg-blue-50 !text-blue-500 !border-blue-500",
  Denied: "!bg-red-50 !text-red-500 !border-red-500",
};

const ReferenceLetter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();

  const handleAccept = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (!values.file || values.file.fileList.length === 0) {
      message.error("Please upload a file!");
      return;
    }

    const formData = new FormData();
    formData.append("referenceLetter", values.file.fileList[0].originFileObj);
    formData.append("studentId", selectedRecord?.key);

    // mutation.mutate(formData);
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Requested Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag className={`rounded-lg !px-2 !py-1 ${statusColors[status]}`}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={() => handleAccept(record)}
            disabled={record.status !== "Pending"}
          />
          <Button type="default" danger icon={<CloseCircleOutlined />} />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "Dr. Smith",
      purpose: "Job Application",
      date: "27-06-24",
      status: "Pending",
    },
    {
      key: "2",
      name: "Dr. Sherman Upton",
      purpose: "Master's Program",
      date: "27-06-24",
      status: "Approved",
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />

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
            <Button type="primary" htmlType="submit">
              Upload
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ReferenceLetter;
