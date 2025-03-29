import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./Layout/DashboardLayout";
import RequireAuth from "./Layout/RequireAuth";
import Dashboard from "./pages/Dashboard";
import Assignments from "./pages/Assignments";
import Users from "./pages/Users";
import Subjects from "./pages/Subjects";
import ReferenceLetter from "./pages/ReferenceLetter";
import AssignmentDetails from "./pages/AssignmentDetails";
import StudentAssignments from "./pages/StudentAssignments";
import StudentReferenceLetter from "./pages/StudentRefernceLetter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route
              path="/student-assignments"
              element={<StudentAssignments />}
            />
            <Route path="/assignment/:id" element={<AssignmentDetails />} />
            <Route path="/users" element={<Users />} />
            <Route path="/courses" element={<Subjects />} />
            <Route path="/reference-letter" element={<ReferenceLetter />} />
            <Route
              path="/student-reference-letter"
              element={<StudentReferenceLetter />}
            />

            {/* {publicRoutes.map((route, index) => (
            <Route
              key={`public-route-${index}`}
              path={route.path}
              element={route.element}
            />
          ))} */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
