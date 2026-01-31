import { Navigate } from "react-router";
import { useAuthContext } from "../context/UserContextProvider";

const ProtectedRoute = ({ children,  allow }) => {
  const { userInfo } = useAuthContext();

  // ยังไม่ login
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // จำกัด role
  if (allow && !allow.includes(userInfo.role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
};

export default ProtectedRoute;