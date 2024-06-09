import { Box, Typography, Grid, Paper, Avatar } from "@mui/material";
import Header from "../../components/dashboard/Header";
import { dataReservation } from "../../dummieData/reservationData.js";
import { useTheme } from "@emotion/react";

const Reservation = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DATA RESERVASI" subtitle="Kelola permintaan reservasi." />
      <Paper
        elevation={3}
        sx={{
          borderRadius: "4px",
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "primary.main",
          p: 3,
          pb: 2,
          pt: 3,
          boxShadow: "default",
        }}
      >
        <Typography variant="h4" component="h4" gutterBottom>
          Top Channels
        </Typography>

        <Box display="flex" flexDirection="column">
          <Grid
            container
            sx={{
              backgroundColor: theme.palette.secondary.main,
              color: "primary.main",
              p: 1,
            }}
          >
            <Grid item xs={3} sm={2}>
              <Typography variant="subtitle2">Pelanggan</Typography>
            </Grid>
            <Grid item xs={3} textAlign="center">
              <Typography variant="subtitle2">Layanan</Typography>
            </Grid>
            <Grid item xs={3} textAlign="center">
              <Typography variant="subtitle2">Tanggal</Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sm={2}
              textAlign="center"
              display={{ xs: "none", sm: "block" }}
            >
              <Typography variant="subtitle2">Sales</Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sm={2}
              textAlign="center"
              display={{ xs: "none", sm: "block" }}
            >
              <Typography variant="subtitle2">Conversion</Typography>
            </Grid>
          </Grid>

          {dataReservation.map((item, index) => (
            <Grid
              container
              key={index}
              sx={{ borderBottom: 1, borderColor: "divider", p: 1 }}
            >
              <Grid item xs={3} sm={2} display="flex" alignItems="center">
                <Avatar src={item.imgSrc} alt={item.name} sx={{ mr: 2 }} />
                <Typography
                  variant="body2"
                  display={{ xs: "none", sm: "block" }}
                >
                  {item.name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                textAlign="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body2">{item.visitors}</Typography>
              </Grid>
              <Grid
                item
                xs={3}
                textAlign="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body2" sx={{ color: "success.main" }}>
                  {item.revenue}
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sm={2}
                textAlign="center"
                display={{ xs: "none", sm: "flex" }}
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body2">{item.sales}</Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sm={2}
                textAlign="center"
                display={{ xs: "none", sm: "flex" }}
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="body2" sx={{ color: "primary.main" }}>
                  {item.conversion}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default Reservation;
