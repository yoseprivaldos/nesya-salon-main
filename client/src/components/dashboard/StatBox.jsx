/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const StatBox = ({ title, subtitle, icon }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
        }}
      >
        <Box sx={{ fontSize: 48, mr: 2 }}>{icon}</Box>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h5"
        sx={{ color: "secondary.main", fontWeight: "bold" }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default StatBox;
