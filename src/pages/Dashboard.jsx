import React, { useState, useEffect } from "react";
import { getDashboard } from "../apis/dashboardApi";
import { useSelector } from "react-redux";
import AdminDashboard from "../components/AdminDashboard";
import TeacherDashboard from "../components/TeacherDashboard";
import StudentDashboard from "../components/StudentDashboard";
import { Spin } from "antd";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useSelector((state) => state.system);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboard();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {user.role === "admin" ? (
        <AdminDashboard data={dashboardData} />
      ) : user.role === "teacher" ? (
        <TeacherDashboard data={dashboardData} />
      ) : (
        <StudentDashboard data={dashboardData} />
      )}
    </div>
  );
};

export default Dashboard;
