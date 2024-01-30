import { useContext } from "react";
import { User } from "../Context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const auth = useContext(User);
  const location = useLocation();
  return auth.auth.userDetails ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} replace to="/login" />
  );
}
