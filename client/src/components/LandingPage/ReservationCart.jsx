/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";

const ReservationCart = ({
  services,
  date,
  status,
  note,
  startTime,
  endTime,
  totalPrice,
  image,
}) => {
  return (
    <Box
      borderRadius={2}
      boxShadow={2}
      border={1}
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      maxWidth="600px"
      maxHeight="280px"
      backgroundColor="secondary.main"
    >
      <Box display="flex" height="60%" sx={{ borderBottom: 1 }}>
        <Card
          sx={{
            width: "30%",
            display: "flex",
            alignItems: "center",
            backgroundColor: "secondary.main",
            padding: 2,
            boxShadow: 0,
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt="Deskripsi gambar"
            sx={{ height: "100px", border: 1, width: "100%" }}
          />
        </Card>
        <Box
          display="flex"
          flexDirection="column"
          width="50%"
          justifyContent="center"
        >
          <Typography sx={{ fontSize: 16, pb: 0.04, fontWeight: "bold" }}>
            {services}
          </Typography>
          <Typography sx={{ fontSize: 14, pb: 0.02 }}>{date}</Typography>
          <Typography sx={{ fontSize: 13 }}>
            {startTime} WIB - {endTime} WIB
          </Typography>
        </Box>
        <Box width="20%" p={1}>
          <Typography variant="overline" sx={{ fontSize: "12px" }}>
            {status}
          </Typography>
        </Box>
      </Box>
      <Box
        height="20%"
        display="flex"
        justifyContent="flex-end"
        alignContent="center"
        alignItems="center"
        sx={{ borderBottom: 1, pr: 1 }}
      >
        <Typography variant="body2">Rp.{totalPrice}</Typography>
      </Box>
      <Grid container height="20%" alignContent="center">
        <Grid item xs={8} sx={{ pl: 2, display: "flex", alignItems: "center" }}>
          <Typography variant="body2">NOTE: {note}</Typography>
        </Grid>
        <Grid
          item
          xs={4}
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="end"
          alignContent="flex-end"
        >
          <Button variant="contained">NILAI</Button>
          <Button variant="contained">AKSI</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReservationCart;
