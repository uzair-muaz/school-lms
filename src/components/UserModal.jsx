import React from "react";
import { Modal, Form, Input, Select, DatePicker, Button } from "antd";
import useCreateUser from "../hooks/useCreateUser";

const UserModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const { mutate: createUser, isLoading } = useCreateUser();

  const onFinish = async (values) => {
    try {
      createUser(values, {
        onSuccess: () => {
          form.resetFields();
          onCancel();
        },
      });
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title="Create New User"
      open={visible}
      centered
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          role: "student",
          status: "active",
        }}
        size="large"
        requiredMark={false}
      >
        <div className="grid grid-cols-2 gap-x-5">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[
              { required: true, message: "Please input the department!" },
            ]}
          >
            <Input placeholder="Enter department" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select the role!" }]}
          >
            <Select placeholder="Select role">
              <Select.Option value="student">Student</Select.Option>
              <Select.Option value="teacher">Teacher</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input the phone number!" },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item
            label="Joining Date"
            name="joiningDate"
            rules={[
              { required: true, message: "Please select the joining date!" },
            ]}
          >
            <DatePicker
              placeholder="Select joining date"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="flex justify-end">
          <Button loading={isLoading} type="primary" htmlType="submit">
            Create User
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UserModal;
