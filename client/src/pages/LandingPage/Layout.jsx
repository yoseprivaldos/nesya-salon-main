import { Outlet } from "react-router-dom";

import { Box } from "@mui/material";
import Header from "../../components/LandingPage/Header";
import Footer from "../../components/LandingPage/Footer";

const LayoutLandingPage = () => {
  return (
    <Box>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default LayoutLandingPage;
