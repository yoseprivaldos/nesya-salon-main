import { Box, Grid, Typography } from "@mui/material";

const Services = () => {
  return (
    <Box sx={{ padding: 3, bgcolor: "#121212", color: "white" }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Layanan Kami
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={4} sx={{ bgcolor: "red" }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Wanita
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ bgcolor: "purple" }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Pria
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ bgcolor: "brown" }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Paket
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Services;
