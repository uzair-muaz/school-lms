import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login";
import DashboardLayout from "./Layout/DashboardLayout";
import RequireAuth from "./Layout/RequireAuth";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
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
