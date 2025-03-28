import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Spin } from "antd";
import { useUpdateCourse } from "../hooks/useCourseData"; // Custom hook for data fetching
import { useCreateCourse, useUsers } from "../hooks/hooks";

const CourseModal = ({ visible, onCancel, courseId = null }) => {
  const [form] = Form.useForm();
  const { data: users, isLoading: isUsersLoading } = useUsers();
  // const { data: courseData, isLoading: isCourseLoading } = useCourse(courseId);

  const createCourse = useCreateCourse();
  const { mutate: updateCourseMutation, isLoading: isUpdating } =
    useUpdateCourse();

  const [loading, setLoading] = useState(false);

  // Reset form and load course data when modal is opened for editing
  // useEffect(() => {
  //   if (visible) {
  //     form.resetFields();
  //     if (courseId && courseData) {
  //       form.setFieldsValue({
  //         name: courseData.name,
  //         code: courseData.code,
  //         status: courseData.status,
  //         teacherId: courseData.teacherId,
  //         studentIds: courseData.studentIds,
  //       });
  //     }
  //   }
  // }, [visible, courseId, courseData, form]);

  // Handle form submission for creating or updating course
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      if (courseId) {
        // Update course
        await updateCourseMutation({ courseId, ...values });
      } else {
        // Create new course
        await createCourse.mutateAsync({ courseData: values });
      }
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error("Error submitting course:", error);
    } finally {
      setLoading(false);
    }
  };

  if (
    isUsersLoading ||
    courseId
    // && isCourseLoading
  ) {
    return <Spin size="large" />;
  }

  return (
    <Modal
      title={courseId ? "Edit Course" : "Create Course"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={700}
      centered
    >
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        initialValues={{
          status: "active",
          studentIds: [],
        }}
      >
        <Form.Item
          label="Course Name"
          name="name"
          rules={[{ required: true, message: "Please input the course name!" }]}
        >
          <Input placeholder="Enter course name" />
        </Form.Item>

        <Form.Item
          label="Course Code"
          name="code"
          rules={[{ required: true, message: "Please input the course code!" }]}
        >
          <Input placeholder="Enter course code" />
        </Form.Item>

        <Form.Item
          label="Teacher"
          name="teacherId"
          rules={[{ required: true, message: "Please select the teacher!" }]}
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
          label="Students"
          name="studentIds"
          rules={[{ required: true, message: "Please select students!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select students"
            style={{ width: "100%" }}
          >
            {users?.data
              ?.filter((student) => student.role === "student")
              .map((student) => (
                <Select.Option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </Select.Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[
            { required: true, message: "Please select the course status!" },
          ]}
        >
          <Select placeholder="Select status">
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex justify-end">
          {courseId && (
            <Button
              type="danger"
              // onClick={handleDeleteCourse}
              // loading={isDeleting}
              style={{ marginRight: 8 }}
            >
              Delete Course
            </Button>
          )}
          <Button type="default" onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={createCourse.isPending || isUpdating}
          >
            {courseId ? "Update Course" : "Create Course"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CourseModal;
