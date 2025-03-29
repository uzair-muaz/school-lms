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
import { useAssignedCourses, useCreateAssignment } from "../hooks/hooks";

const { Option } = Select;

const CreateAssignmentModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const submitAssignment = useCreateAssignment();

  const { data: assignedCourses } = useAssignedCourses();

  const onFinish = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("courseId", values.subject);
    formData.append("dueDate", values.dueDate.format("YYYY-MM-DD"));
    formData.append(
      "isAllowLateSubmission",
      values.allowLateSubmission === "true" ? true : false,
    );
    formData.append("gradingCriteria", values.gradingCriteria);
    if (values.file) {
      values.file.fileList.forEach((file) => {
        formData.append("file", file.originFileObj);
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
              {assignedCourses?.data?.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course.name}
                </Option>
              ))}
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
        </Form.Item>

        <Form.Item
          label="Allow late Submissions?"
          name="allowLateSubmission"
          initialValue="true"
        >
          <Radio.Group>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
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
