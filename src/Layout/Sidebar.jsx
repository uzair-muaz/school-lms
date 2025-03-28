import { Link } from "react-router-dom";
import {
  FaUserFriends,
  FaBook,
  FaSignOutAlt,
  FaGraduationCap,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { clearSystem, setActiveTab } from "../redux/systemSlice";

const Sidebar = () => {
  const { isSidebarOpen, user } = useSelector((state) => state.system);

  const collapsed = isSidebarOpen;

  const role = user.role ?? "admin";
  return (
    <div
      className={`h-screen bg-white transition-all ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Logo & Toggle Button */}
      <div className="mx-auto flex max-w-[80%] items-center justify-between border-b border-[#8A8E9D] p-4">
        <div className="flex items-center justify-center gap-3">
          <img src="/logo-small.svg" alt="logo" />

          {!collapsed && <h1 className="text-2xl font-semibold">Teach</h1>}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="mt-4">
        <ul className="space-y-2">
          <SidebarItem
            to="/dashboard"
            icon={<MdSpaceDashboard />}
            text="Dashboard"
            collapsed={collapsed}
          />
          {role === "admin" && (
            <SidebarItem
              to="/users"
              icon={<FaUserFriends />}
              text="Users"
              collapsed={collapsed}
            />
          )}
          {role === "admin" && (
            <SidebarItem
              to="/courses"
              icon={<FaBook />}
              text="Courses"
              collapsed={collapsed}
            />
          )}
          {role !== "admin" && (
            <SidebarItem
              to="/assignments"
              icon={<FaGraduationCap />}
              text="Assignments"
              collapsed={collapsed}
            />
          )}
          {role !== "admin" && (
            <SidebarItem
              to="/reference-letter"
              icon={<FaGraduationCap />}
              text="Reference Letter"
              collapsed={collapsed}
            />
          )}

          <SidebarItem
            to="/login"
            icon={<FaSignOutAlt />}
            text="Logout"
            collapsed={collapsed}
          />
        </ul>
      </nav>
    </div>
  );
};

// Sidebar Item Component
const SidebarItem = ({ to, icon, text, collapsed }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <Link
        to={to}
        onClick={() => {
          if (text !== "Logout") {
            dispatch(setActiveTab(text));
          } else {
            dispatch(clearSystem());
          }
        }}
        className={`flex items-center space-x-4 rounded-md px-5 py-3 transition hover:bg-gray-200 ${collapsed && "justify-center"}`}
      >
        <span className="text-lg text-[#8A8E9D]">{icon}</span>
        {!collapsed && <span className="text-base">{text}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;
