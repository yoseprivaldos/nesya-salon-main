/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Box, useTheme } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const theme = useTheme();
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(${theme.palette.primary.main} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${theme.palette.background.alt} ${angle}deg 360deg),
            ${theme.palette.secondary.main}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
