/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser || !allowedRoles.includes(currentUser.role)) {
    // Jika pengguna tidak ada atau perannya tidak termasuk dalam allowedRoles, arahkan ke halaman lain
    return <Navigate to="/" />;
  }

  return children;
};

//menvalidasi props yang diterima kompoent ProtectedRoute
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default ProtectedRoute;
