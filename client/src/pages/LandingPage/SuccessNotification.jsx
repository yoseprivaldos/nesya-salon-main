/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function ThankYouPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Grid container gap={9} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom>
            Yeay!!!!
          </Typography>
          <CheckCircleIcon
            sx={{
              fontSize: 120,
              color: "green",
              mx: "auto",
              display: "block",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h3" align="center" paragraph>
            Reservasi kamu berhasil dibuat, silahkan tunggu email pemberitahuan
            atau lihat status reservasi kamu.
          </Typography>
        </Grid>
        <Grid container justifyContent="space-around">
          <Grid item xs={12} sm={12}>
            <Button
              variant="contained"
              color="primary"
              href="/reservation"
              fullWidth
            >
              Lihat Reservasi
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant="outlined" color="primary" href="/" fullWidth>
              Kembali ke Beranda
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ThankYouPage;
