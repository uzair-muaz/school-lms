import { Button } from "antd";
import CourseTable from "../components/CourseTable";
import { useState } from "react";
import { useDeleteCourse } from "../hooks/hooks";
import CourseModal from "../components/CourseModal";

const Subjects = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);

  const deleteCourse = useDeleteCourse();

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setCurrentCourseId(null);
  };

  const handleEdit = (courseId) => {
    setCurrentCourseId(courseId);
    setIsModalVisible(true);
  };

  const handleDelete = async (courseId) => {
    await deleteCourse.mutateAsync({
      id: courseId,
    });
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-end">
        <Button
          type="primary"
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          + Add New Assignment
        </Button>
      </div>
      <div className="bg-white p-5">
        <CourseTable handleDelete={handleDelete} handleEdit={handleEdit} />
      </div>

      <CourseModal
        visible={isModalVisible}
        onCancel={handleCloseModal}
        courseId={currentCourseId}
      />
    </div>
  );
};

export default Subjects;
