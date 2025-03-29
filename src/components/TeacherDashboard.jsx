import { Pie } from "react-chartjs-2";
import { BookOpen, ClipboardList, FileText } from "lucide-react";

// Register Chart.js components and the plugin

// Card component for displaying summary metrics
const Card = ({ icon: Icon, title, value, color }) => (
  <div className="flex min-h-96 flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-4">
    <Icon className={`size-20 ${color}`} />
    <div className="text-center">
      <p className="text-2xl text-gray-600">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const TeacherDashboard = ({ data }) => {
  return (
    <div className="grid gap-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Cards displaying key metrics */}
        <Card
          icon={BookOpen}
          title="Total Courses"
          value={data.totalCourses}
          color="text-blue-500"
        />
        <Card
          icon={ClipboardList}
          title="Active Assignments"
          value={data.activeAssignments}
          color="text-red-500"
        />
        <Card
          icon={FileText}
          title="Pending Grades"
          value={data.pendingAssignmentGrades}
          color="text-green-500"
        />
        <Card
          icon={ClipboardList}
          title="Pending Reference Requests"
          value={data.pendingReferenceRequests}
          color="text-yellow-500"
        />
      </div>
    </div>
  );
};

export default TeacherDashboard;
