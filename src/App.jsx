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
            <Route path="/users" element={<Users />} />
            <Route path="/courses" element={<Subjects />} />
            <Route path="/reference-letter" element={<ReferenceLetter />} />

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
