/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

const SelectedServices = ({ selectedServiceIds, services }) => {
  return (
    <Box pl={2} pr={1} pt={0.6}>
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Layanan yang Dipilih:
        </Typography>
        {selectedServiceIds.length === 0 ? (
          <Typography variant>Belum ada Layanan yang dipilih.</Typography>
        ) : (
          services
            .filter((service) => selectedServiceIds.includes(service._id))
            .map((service) => (
              <Box key={service._id} sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Typography variant="body1">
                      Layanan: {service.name}
                    </Typography>
                    <Typography variant="body2">
                      Durasi: {service.duration} menit
                    </Typography>
                    <Typography variant="body2">
                      Harga: Rp {service.price.toLocaleString("id-ID")}
                    </Typography>
                    <Typography variant="body2">
                      Deskripsi: {service.description}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Box
                      sx={{
                        overflow: "hidden",
                        height: "110px", // batasan tinggi gambar
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc", // optional: border untuk gambar
                      }}
                    >
                      <img
                        src={service.imageService}
                        alt={service.name}
                        style={{
                          objectFit: "cover",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          height: "100%",
                        }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            ))
        )}
      </Paper>
    </Box>
  );
};

export default SelectedServices;
