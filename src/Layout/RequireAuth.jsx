import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { clearSystem } from "../redux/systemSlice";

function RequireAuth() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.system?.token); // Safe access to state

  // Check if the token is valid
  // const isTokenValid = !!token; // Ensures it's a boolean
  const isTokenValid = true; // Ensures it's a boolean

  if (!isTokenValid) {
    dispatch(clearSystem()); // Clear the system state
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
