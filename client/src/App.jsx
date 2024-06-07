import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeDashboard } from "./utils/dashboard.theme.js";
import themePublic from "./utils/public.theme.js";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Dashboard from "./pages/DashboardPanel/Dashboard.jsx";
import ProtectedRoute from "./components/dashboard/ProtectedRoute.jsx";
import ServiceDashboard from "./pages/DashboardPanel/Services.jsx";
import ProductDashboard from "./pages/DashboardPanel/Products.jsx";
import EmployeeDashboard from "./pages/DashboardPanel/Employee.jsx";
import LayoutDashboard from "./pages/DashboardPanel/Layout.jsx";
import LayoutLandingPage from "./pages/LandingPage/Layout.jsx";
import Home from "./pages/LandingPage/Home.jsx";
import Login from "./pages/LandingPage/Login.jsx";
import Register from "./pages/LandingPage/Register.jsx";
import Account from "./pages/LandingPage/Account.jsx";
import Reservation from "./pages/LandingPage/Reservation.jsx";
import FormReservation from "./pages/LandingPage/FormReservation.jsx";
import Services from "./pages/LandingPage/Services.jsx";
import Product from "./pages/LandingPage/Product.jsx";

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
              <ThemeProvider theme={themePublic}>
                <CssBaseline />
                <Routes>
                  <Route element={<LayoutLandingPage />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/reservation" element={<Reservation />} />
                    <Route
                      path="/form-reservation"
                      element={<FormReservation />}
                    />
                    <Route path="/account" element={<Account />} />
                    <Route path="/products" element={<Product />} />
                  </Route>
                </Routes>
              </ThemeProvider>
            }
          />
          {/* Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ThemeProvider theme={themeDash}>
                  <CssBaseline />
                  <LayoutDashboard />{" "}
                  {/* Render LayoutDashboard di level atas */}
                </ThemeProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />{" "}
            <Route path="services" element={<ServiceDashboard />} />{" "}
            <Route path="products" element={<ProductDashboard />} />{" "}
            <Route path="employees" element={<EmployeeDashboard />} />{" "}
          </Route>

          {/* testingUI */}
          <Route>
            {/* <Route path="/account" element={<Account />} /> */}
            {/* <Route
              path="/account/edit-account/information"
              element={<EditUserInformation />}
            /> */}

            {/* <Route path="/reservation" element={<Reservation />} /> */}
            {/* <Route path="/services" element={<Services />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
