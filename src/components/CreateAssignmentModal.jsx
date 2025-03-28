import React from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Button,
  Radio,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useCreateAssignment } from "../hooks/hooks";

const { Option } = Select;

const CreateAssignmentModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const submitAssignment = useCreateAssignment();

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("subject", values.subject);
    formData.append("dueDate", values.dueDate.format("YYYY-MM-DD"));
    formData.append("allowLateSubmission", values.allowLateSubmission);
    formData.append("gradingCriteria", values.gradingCriteria);
    if (values.files) {
      values.files.fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
    }

    await submitAssignment.mutateAsync(
      { formData: formData },
      {
        onSuccess: () => {
          form.resetFields();
          onCancel();
        },
      },
    );
  };

  return (
    <Modal
      title="Create Assignment"
      open={visible}
      centered
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Form form={form} onFinish={onFinish} layout="vertical" size="large">
        <Form.Item
          label="Assignment Title"
          name="title"
          rules={[{ required: true, message: "Enter assignment title" }]}
        >
          <Input placeholder="Enter Assignment Title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Enter description" }]}
        >
          <Input.TextArea placeholder="Enter Description" />
        </Form.Item>

        <div className="grid grid-cols-2 gap-x-5">
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Select subject" }]}
          >
            <Select placeholder="Select Subject">
              <Option value="math">Math</Option>
              <Option value="science">Science</Option>
              <Option value="history">History</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Due Date"
            name="dueDate"
            rules={[{ required: true, message: "Select due date" }]}
          >
            <DatePicker placeholder="Select Date" style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <Form.Item
          label="Upload Assignment"
          name="file"
          rules={[{ required: true, message: "Select a file" }]}
        >
          <Upload beforeUpload={() => false} multiple>
            <Button icon={<UploadOutlined />}>Browse File</Button>
          </Upload>
          <p className="mt-2 text-sm text-gray-500">
            Photos must be PDF or JPEG format and at least 2048x768
          </p>
        </Form.Item>

        <Form.Item
          label="Allow late Submissions?"
          name="allowLateSubmission"
          initialValue="yes"
        >
          <Radio.Group>
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Grading Criteria" name="gradingCriteria">
          <Input placeholder="Enter Marks" />
        </Form.Item>

        <div className="flex justify-end gap-3">
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateAssignmentModal;
