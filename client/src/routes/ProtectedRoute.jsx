import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// ProtectedRoute: wraps routes that require authentication.
// Props:
// - children: element(s) to render when allowed
// - roles: optional array of roles allowed (e.g. ['admin'])
const ProtectedRoute = ({ children, roles = [] }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
