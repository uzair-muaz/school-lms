import { Pie } from "react-chartjs-2";
import { BookOpen, Star, ClipboardList } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and the plugin
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Card = ({ icon: Icon, title, value, color }) => (
  <div className="flex min-h-96 flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-4">
    <Icon className={`size-20 ${color}`} />
    <div className="text-center">
      <p className="text-2xl text-gray-600">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

const StudentDashboard = ({ data }) => {
  // Prepare the data for Chart.js with custom colors
  const chartData = {
    labels: ["Submitted", "Remaining"],
    datasets: [
      {
        data: [data.submissionRate, 100 - data.submissionRate],
        backgroundColor: [
          "#4F46E5", // Custom color for "Submitted"
          "#FF6347", // Custom color for "Remaining" (Tomato Red)
        ],
        hoverBackgroundColor: [
          "#3b37d4", // Hover color for "Submitted"
          "#d13f36", // Hover color for "Remaining"
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`,
        },
      },
      // Add the datalabels plugin to show percentages inside the chart
      datalabels: {
        color: "white", // Text color inside the pie
        formatter: (value) => `${value.toFixed(2)}%`, // Format the value as a percentage
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
        <Card
          icon={BookOpen}
          title="Total Courses"
          value={data.totalCourses}
          color="text-blue-500"
        />
        <Card
          icon={Star}
          title="Average Grade"
          value={`${data.averageGrade}%`}
          color="text-yellow-500"
        />
        <Card
          icon={ClipboardList}
          title="Assignments Due"
          value={data.assignmentsDue}
          color="text-red-500"
        />
        <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold">Submission Rate</h2>
          <div style={{ height: "300px" }}>
            <Pie data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
