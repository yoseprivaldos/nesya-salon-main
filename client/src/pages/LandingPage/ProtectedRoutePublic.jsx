/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../../redux/user/userSlice";

const ProtectedRoutePublic = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  if (!currentUser) {
    dispatch(
      setNotification(
        "Anda harus login terlebih dahulu untuk mengakses halaman ini."
      )
    );
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoutePublic;
