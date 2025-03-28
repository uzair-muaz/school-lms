import { Button } from "antd";
import AssignmentTable from "../components/AssignmentTable";
import { useState } from "react";
import CreateAssignmentModal from "../components/CreateAssignmentModal";

const Assignments = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        <AssignmentTable />
      </div>

      <CreateAssignmentModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      />
    </div>
  );
};

export default Assignments;
