import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  return (
    <main className="flex">
      <Sidebar />
      <section className="h-screen flex-1">
        <Header />
        <div
          style={{
            minHeight: "calc(100vh - 80px)",
            maxHeight: "calc(100vh - 80px)",
          }}
          className="h-full overflow-auto bg-[#f8f8f8] p-5"
        >
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default DashboardLayout;
