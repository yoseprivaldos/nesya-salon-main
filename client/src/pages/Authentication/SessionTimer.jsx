/* eslint-disable no-unused-vars */
// SessionTimer.jsx
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

const SessionTimer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    let sessionTimeout;

    const handleSessionTimeout = () => {
      dispatch(signOut()); // Melakukan logout ketika waktu sesi habis
      navigate("/login"); // Mengarahkan kembali ke halaman login
    };

    if (currentUser) {
      sessionTimeout = setTimeout(handleSessionTimeout, 2 * 60 * 60 * 1000); // Set timeout 2 jam
    }

    return () => {
      clearTimeout(sessionTimeout); // Membersihkan timer saat komponen unmount atau currentUser menjadi null
    };
  }, [dispatch, navigate, currentUser]);

  return null; // SessionTimer tidak merender apa pun secara visual
};

export default SessionTimer;
