import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeDashboard } from "./utils/dashboard.theme.js";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Dashboard from "./pages/DashboardPanel/Dashboard/index.jsx";
import LayoutDashboard from "./pages/DashboardPanel/Layout/index.jsx";
import LayoutLandingPage from "./pages/LandingPage/Layout.jsx";
import Home from "./pages/LandingPage/Home.jsx";
import Login from "./pages/LandingPage/Login.jsx";
import Register from "./pages/LandingPage/Register.jsx";
import Account from "./pages/LandingPage/Account.jsx";
import Reservation from "./pages/LandingPage/Reservation.jsx";
import Services from "./pages/LandingPage/Services.jsx";
import EditUserInformation from "./pages/LandingPage/EditUserInformation.jsx";
import EditUserPassword from "./pages/LandingPage/EditUserPassword.jsx";

export default function App() {
  const mode = useSelector((state) => state.global.mode);
  const themeDash = useMemo(() => createTheme(themeDashboard(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* Public Route */}
          <Route
            path="/*"
            element={
              <Routes>
                <Route element={<LayoutLandingPage />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>
              </Routes>
            }
          />

          {/* Dashboard Route */}
          <Route
            path="/dashboard/*"
            element={
              <ThemeProvider theme={themeDash}>
                <CssBaseline />
                <Routes>
                  <Route element={<LayoutDashboard />}>
                    <Route
                      path="/"
                      element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<Dashboard />} />
                  </Route>
                </Routes>
              </ThemeProvider>
            }
          />
          {/* estingUI */}
          <Route>
            <Route path="/account" element={<Account />} />
            <Route
              path="/account/edit-account/information"
              element={<EditUserInformation />}
            />
            <Route
              path="/account/edit-account/password"
              element={<EditUserPassword />}
            />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/services" element={<Services />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
