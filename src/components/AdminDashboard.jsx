import { Pie } from "react-chartjs-2";
import { BookOpen, Users, UserCheck, Hash } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and the plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

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

const AdminDashboard = ({ data }) => {
  // Data preparation for Teacher-Student Ratio chart
  const chartData = {
    labels: ["Teachers", "Students"],
    datasets: [
      {
        data: [data.totalTeachers, data.totalStudents],
        backgroundColor: [
          "#4F46E5", // Custom color for "Teachers"
          "#FF6347", // Custom color for "Students"
        ],
        hoverBackgroundColor: [
          "#3b37d4", // Hover color for "Teachers"
          "#d13f36", // Hover color for "Students"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
      // Add the datalabels plugin to show data inside the pie chart
      datalabels: {
        color: "white", // Text color inside the pie
        formatter: (value) => `${value}`, // Display the actual count
        font: {
          weight: "bold",
          size: 14,
        },
        anchor: "center", // Position the label in the center of the slice
        align: "center", // Align the text in the center
      },
    },
  };

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
          icon={Users}
          title="Total Teachers"
          value={data.totalTeachers}
          color="text-green-500"
        />
        <Card
          icon={UserCheck}
          title="Total Students"
          value={data.totalStudents}
          color="text-red-500"
        />
        <Card
          icon={Hash}
          title="Teacher-Student Ratio"
          value={data.teacherStudentRatio}
          color="text-yellow-500"
        />
      </div>

      {/* Pie chart for Teacher-Student Ratio */}
      <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-2xl text-gray-600">Teacher-Student Ratio</h2>
        <div style={{ height: "300px" }}>
          <Pie data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
