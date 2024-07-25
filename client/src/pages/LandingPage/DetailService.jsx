/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useGetServiceByIdQuery } from "../../redux/api/api";

const ServiceDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: service, isLoading } = useGetServiceByIdQuery(id);

  console.log(service);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Data Layanan Tidak Tersedia</div>;
  }

  return (
    <Box sx={{ bgcolor: "white", padding: { xs: 2, sm: 4, md: 6 } }}>
      {/* Title */}
      <Box sx={{ borderBottom: 4, marginBottom: 3 }}>
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
          DETAIL LAYANAN
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {/* Display all images */}
          {Array.isArray(service.imageService) &&
          service.imageService.length > 0 ? (
            <Carousel
              navButtonsAlwaysInvisible={service.imageService.length === 1}
              indicators={service.imageService.length > 1}
            >
              {service.imageService.map((image, index) => (
                <Paper
                  key={index}
                  sx={{
                    bgcolor: "#fff8f",
                    height: { xs: "350px", sm: "520px", md: "500px" },
                    marginBottom: 2,
                    overflow: "hidden",
                    "&:hover": !isMobile
                      ? {
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                          transform: "translateY(-2px)",
                        }
                      : {},
                    transition: "all 0.3s ease",
                  }}
                >
                  <img
                    src={image}
                    alt={service.name}
                    style={{
                      width: "90%",
                      height: "100%",
                      margin: "auto",
                    }}
                  />
                </Paper>
              ))}
            </Carousel>
          ) : (
            <Typography>Tidak ada gambar tersedia</Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              padding: { xs: 1, sm: 1.7, md: 2 },
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.5rem",
                  md: "2rem",
                },
              }}
            >
              {service.name}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  md: "1.25rem",
                },
              }}
            >
              {service.description}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: {
                  xs: "0.875rem",
                  sm: "1rem",
                  md: "1.25rem",
                },
              }}
            >
              Durasi: {service.duration} menit
            </Typography>

            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                fontSize: {
                  xs: "1rem",
                  sm: "1.25rem",
                  md: "1.5rem",
                },
              }}
            >
              Harga: Rp {service.price.toLocaleString("id-ID")}
            </Typography>

            <Button
              variant="contained"
              component={Link}
              to="/form-reservation"
              sx={{
                fontSize: {
                  xs: "0.75rem",
                  sm: "1rem",
                  md: "1.25rem",
                },
                color: "white",
                bgcolor: "primary.main",
                marginTop: 2,
              }}
            >
              Pesan Sekarang
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ServiceDetail;
