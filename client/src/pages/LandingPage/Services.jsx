/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { useGetServicesQuery } from "../../redux/api/api";

const filterMain = [
  { title: "Semua", path: "/services" },
  { title: "Wanita", path: "/services?category=wanita" },
  { title: "Pria", path: "/services?category=pria" },
  { title: "Anak-anak", path: "/services?category=anak" },
  { title: "Paket Acara", path: "/services?category=paket acara" },
];

const Services = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: services, isLoading } = useGetServicesQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8; // Jumlah layanan per halaman

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredServices =
    services?.filter((service) => {
      const selectedCategory = queryParams.get("category");
      if (!selectedCategory) {
        return true; // Tidak ada filter, tampilkan semua layanan
      }

      return service.categories.some(
        (cat) => cat.name.toLowerCase() === selectedCategory.toLowerCase()
      );
    }) || [];

  // Menghitung index awal dan akhir layanan yang akan ditampilkan
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService
  );

  return (
    <>
      <Box sx={{ bgcolor: "white", padding: { xs: 2, sm: 4, md: 4 } }}>
        {/* Tittle Utama */}
        <Box sx={{ borderBottom: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              bgcolor: "white",
              color: "background.alt",
              letterSpacing: 1.5,
              paddingBottom: 2,
              textAlign: "center",
            }}
          >
            Daftar Layanan
          </Typography>
        </Box>

        {/* Filter Section */}
        <Box
          display="flex"
          alignContent="center"
          sx={{
            bgcolor: "white",
            color: "secondary.main",
            marginTop: 1,
            marginBottom: 3,
          }}
        >
          <Grid width="100%">
            <ButtonGroup
              variant="outlined"
              aria-label="filter buttons"
              fullWidth
            >
              {filterMain.map((filter) => (
                <Button
                  variant="contained"
                  key={filter.title}
                  component={Link}
                  to={filter.path}
                  sx={{
                    borderRadius: 2,
                    backgroundColor: "primary.main",
                    color: "secondary.main",
                    fontSize: { xs: "0.6rem", sm: "0.875rem", md: "1rem" },
                  }}
                >
                  {filter.title}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
        </Box>

        {/* SERVICE CONTENT */}
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <Grid container spacing={{ xs: 2, sm: 4, md: 2 }} mb={4}>
            {currentServices.map((service) => (
              <Grid item xs={6} sm={6} md={3} key={service._id}>
                <Link
                  to={`/service/${service._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Paper
                    sx={{
                      bgcolor: "#fff8f",
                      height: { xs: "350px", sm: "520px", md: "450px" },
                      display: "flex",
                      flexDirection: "column",

                      "&:hover": !isMobile
                        ? {
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                            transform: "translateY(-2px)",
                          }
                        : {},
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Box sx={{ flexBasis: "70%", overflow: "hidden" }}>
                      <img
                        src={service.imageService}
                        alt={service.name}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        padding: { xs: 1, sm: 1.7, md: 2 },
                        paddingBottom: { xs: 1, sm: 1.7, md: 0.5 },
                        flexBasis: "30%",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: { xs: 0.05, sm: 0.6, md: 1 },
                          overflow: "hidden",
                        }}
                      >
                        {/* <Typography
                          variant="h6"
                          fontWeight="bold"
                          component="h3"
                          sx={{
                            fontSize: {
                              xs: "0.7rem",
                              sm: "1.25rem",
                              md: "1.5rem",
                            },
                            textDecoration: "underline",
                          }}
                        >
                          {service.name}
                        </Typography> */}
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: {
                              xs: "0.5rem",
                              sm: "0.875rem",
                              md: "1rem",
                            },
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {service.description}
                        </Typography>
                      </Box>
                      <Box>
                        <Grid
                          container
                          justifyContent="space-between"
                          alignItems="center"
                          mt={1}
                        >
                          <Grid item>
                            <Typography
                              variant="h6"
                              fontWeight="bold"
                              sx={{
                                fontSize: {
                                  xs: "0.875rem",
                                  sm: "1rem",
                                  md: "1.25rem",
                                },
                              }}
                            >
                              Rp {service.price.toLocaleString("id-ID")}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              sx={{
                                fontSize: {
                                  xs: "0.4rem",
                                  sm: "0.875rem",
                                  md: "1rem",
                                },
                                color: "white",
                                bgcolor: "primary.main",
                              }}
                            >
                              Detail
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Pagination */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: 4 }}
        >
          <Pagination
            count={Math.ceil(filteredServices.length / servicesPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};

export default Services;
