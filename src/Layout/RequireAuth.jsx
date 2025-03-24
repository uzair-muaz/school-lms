import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { clearSystem } from "../redux/systemSlice";

function RequireAuth() {
  const dispatch = useDispatch();

  const { token, tokenExpiration } = useSelector((state) => state.system);

  const isTokenValid =
    token && tokenExpiration && dayjs(tokenExpiration).isAfter(dayjs());
  // const isTokenValid = true;

  // If token is invalid or expired, clear system data and redirect to login
  if (!isTokenValid) {
    dispatch(clearSystem()); // Clear the system state
    return (
      <>
        <Navigate to="/" replace />
      </>
    );
  }

  return <Outlet />;
}

export default RequireAuth;
