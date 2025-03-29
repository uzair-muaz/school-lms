import React, { useState } from "react";
import { Table, Tag, Button, Modal, Form, message, Input, Select } from "antd";
import { useFetchLetters, useInitiateLetter, useUsers } from "../hooks/hooks"; // Assuming your custom hook is in this path
import { DownloadOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const statusColors = {
  pending: "!bg-yellow-50 !text-yellow-500 !border-yellow-500",
  approved: "!bg-green-50 !text-green-500 !border-green-500",
  denied: "!bg-red-50 !text-red-500 !border-red-500",
};

const StudentReferenceLetter = () => {
  const initiateLetter = useInitiateLetter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [form] = Form.useForm();

  const { data: users } = useUsers();
  const { data, isPending } = useFetchLetters(page, 10);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish = async (values) => {
    try {
      await initiateLetter.mutateAsync({
        letterData: values,
      });
      form.resetFields();
      message.success("Request for letter submitted successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      message.error("There was an error submitting the request.");
    }
  };

  const columns = [
    {
      title: "Student Name",
      dataIndex: ["advisor", "firstName"], // Access first name from the 'advisor' object
      key: "name",
      render: (text, record) =>
        `${record.advisor.firstName} ${record.advisor.lastName}`, // Display the advisor's full name
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
    {
      title: "Requested Date",
      dataIndex: "createdAt",
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
      render: (_, record) => (
        <div className="flex gap-2">
          {record.status === "approved" && record.referenceLetterUrl && (
            <Button
              type="text"
              icon={<DownloadOutlined />}
              className="!border-blue-500 !bg-blue-50 !text-blue-500"
              onClick={() => window.open(record.referenceLetterUrl, "_blank")}
            />
          )}
          {record.status !== "approved" && (
            <Button type="default" icon={<DownloadOutlined />} disabled />
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          className="mb-4"
        >
          Request Reference Letter
        </Button>
      </div>

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

      {/* Request Reference Letter Modal */}
      <Modal
        title="Request a Reference Letter"
        open={isModalOpen}
        centered
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            label="Select Advisor"
            name="advisorId"
            rules={[{ required: true, message: "Please select an advisor!" }]}
          >
            <Select placeholder="Select teacher">
              {users?.data
                ?.filter((student) => student.role === "teacher")
                .map((teacher) => (
                  <Select.Option key={teacher.id} value={teacher.id}>
                    {teacher.firstName} {teacher.lastName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Purpose"
            name="purpose"
            rules={[{ required: true, message: "Please provide a purpose!" }]}
          >
            <Input placeholder="Enter purpose" />
          </Form.Item>

          <Form.Item
            label="Details"
            name="detail"
            rules={[{ required: true, message: "Please provide details!" }]}
          >
            <TextArea rows={4} placeholder="Enter details" />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={handleCancel}>Cancel</Button>
            <Button
              loading={initiateLetter.isPending}
              type="primary"
              htmlType="submit"
            >
              Submit Request
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentReferenceLetter;
