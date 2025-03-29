import { Button, Popconfirm, Table } from "antd";
import { useState } from "react";
import { useCourses } from "../hooks/hooks";

const CourseTable = ({ handleEdit, handleDelete }) => {
  const [page, setPage] = useState(1);
  const { data, isPending, error } = useCourses(page, 10);

  if (error) return <p>Error loading assignments.</p>;

  const columns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Assigned Teacher",
      key: "teacher",
      render: (text, record) =>
        `${record.teacher.firstName} ${record.teacher.lastName}`,
    },
    {
      title: "Assigned Students",
      dataIndex: "studentsCount",
      key: "studentsCount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="space-x-2">
          {/* <Button
            type="text"
            onClick={() => handleEdit(record.id)}
            className="!bg-blue-100 !text-blue-500 hover:!bg-blue-200"
          >
            Edit
          </Button> */}
          <Popconfirm
            title="Are you sure to delete this course?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              className="!bg-red-100 !text-red-500 hover:!bg-red-200"
            >
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      loading={isPending}
      dataSource={data?.data}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: 4,
        total: data?.meta.total,
        onChange: (newPage) => setPage(newPage),
      }}
    />
  );
};

export default CourseTable;
