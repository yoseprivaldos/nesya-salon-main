import { Box, Button, Typography, useTheme } from "@mui/material";
import Header from "../../components/dashboard/Header";
import { AddCircleOutline } from "@mui/icons-material";

const Services = () => {
  const theme = useTheme();
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Layanan" subtitle="Daftar Layanan" />
      <Box mt="40px" height="75vh">
        <Button variant="text">
          <AddCircleOutline
            sx={{ color: theme.palette.secondary[200], mr: "1rem" }}
          />
          <Typography sx={{ color: theme.palette.primary[100] }}>
            Tambah Layanan
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default Services;
