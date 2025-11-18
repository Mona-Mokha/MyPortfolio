import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    return token && role === "admin" ? children : <Navigate to="/signin" />;
};

export default AdminRoute;
