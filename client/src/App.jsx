/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeDashboard } from "./utils/dashboard.theme.js";
import themePublic from "./utils/public.theme.js";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import SessionTimer from "./pages/Authentication/SessionTimer.jsx";

//import Dashboard section
import LayoutDashboard from "./pages/DashboardPanel/Layout.jsx";
import Dashboard from "./pages/DashboardPanel/Dashboard.jsx";
import ProtectedRoute from "./components/dashboard/ProtectedRoute.jsx";
import ServiceDashboard from "./pages/DashboardPanel/Services.jsx";
import AddServiceDashboard from "./pages/DashboardPanel/AddService.jsx";
import EditServiceDashboard from "./pages/DashboardPanel/EditService.jsx";
import ProductDashboard from "./pages/DashboardPanel/Products.jsx";
import EmployeeDashboard from "./pages/DashboardPanel/Employee.jsx";
import AddProductsDashboard from "./pages/DashboardPanel/AddProduct.jsx";
import EditProductDashboard from "./pages/DashboardPanel/EditProduct.jsx";
import ReservationDashboard from "./pages/DashboardPanel/Reservation.jsx";
import CreateReservationDashboard from "./pages/DashboardPanel/CreateReservation.jsx";
import AdminPageDashboard from "./pages/DashboardPanel/AdminPage.jsx";
import ScheduleDashboard from "./pages/DashboardPanel/CalendarPage.jsx";
import ReportDashboard from "./pages/DashboardPanel/Report.jsx";

//import landing page section
import LayoutLandingPage from "./pages/LandingPage/Layout.jsx";
import Home from "./pages/LandingPage/Home.jsx";
import Login from "./pages/LandingPage/Login.jsx";
import Register from "./pages/LandingPage/Register.jsx";
import Account from "./pages/LandingPage/Account.jsx";
import Reservation from "./pages/LandingPage/Reservation.jsx";
import FormReservation from "./pages/LandingPage/FormReservation.jsx";
import Services from "./pages/LandingPage/Services.jsx";
import ServiceDetail from "./pages/LandingPage/DetailService.jsx";
import Product from "./pages/LandingPage/Product.jsx";
import DetailProduct from "./pages/LandingPage/DetailProduct.jsx";
import ReservationSuccess from "./pages/LandingPage/SuccessNotification.jsx";

//test
import ReservationCart from "./components/LandingPage/ReservationCart.jsx";

//protected route public
import ProtectedRoutePublic from "./pages/LandingPage/ProtectedRoutePublic.jsx";

export default function App() {
  const mode = useSelector((state) => state.global.mode);
  const themeDash = useMemo(() => createTheme(themeDashboard(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <SessionTimer />
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
                    <Route path="/service/:id" element={<ServiceDetail />} />
                    <Route
                      path="/reservation"
                      element={
                        <ProtectedRoutePublic>
                          <Reservation />
                        </ProtectedRoutePublic>
                      }
                    />
                    <Route
                      path="/form-reservation"
                      element={
                        <ProtectedRoutePublic>
                          <FormReservation />
                        </ProtectedRoutePublic>
                      }
                    />
                    <Route
                      path="/account"
                      element={
                        <ProtectedRoutePublic>
                          <Account />
                        </ProtectedRoutePublic>
                      }
                    />
                    <Route path="/products" element={<Product />} />
                    <Route
                      path="/product/:productId"
                      element={<DetailProduct />}
                    />
                    <Route
                      path="/reservation-success"
                      element={<ReservationSuccess />}
                    />
                  </Route>
                </Routes>
              </ThemeProvider>
            }
          />
          {/* Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <ThemeProvider theme={themeDash}>
                  <CssBaseline />
                  <LayoutDashboard />{" "}
                  {/* Render LayoutDashboard di level atas */}
                </ThemeProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="services" element={<ServiceDashboard />} />
            <Route
              path="services/create-service"
              element={<AddServiceDashboard />}
            />
            <Route
              path="services/edit-service/:serviceId"
              element={<EditServiceDashboard />}
            />
            <Route path="employees" element={<EmployeeDashboard />} />
            <Route path="products" element={<ProductDashboard />} />
            <Route
              path="products/add-product"
              element={<AddProductsDashboard />}
            />
            <Route
              path="products/edit-product/:productId"
              element={<EditProductDashboard />}
            />
            <Route path="reservations" element={<ReservationDashboard />} />
            <Route
              path="reservations/create-reservation"
              element={<CreateReservationDashboard />}
            />
            <Route path="admin" element={<AdminPageDashboard />}></Route>
            <Route path="schedule" element={<ScheduleDashboard />}></Route>
            <Route path="report" element={<ReportDashboard />}></Route>
          </Route>

          {/* testingUI */}
          <Route>
            <Route path="/reservationCard" element={<ReservationCart />} />
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
