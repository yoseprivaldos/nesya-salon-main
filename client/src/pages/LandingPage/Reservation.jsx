import {
  Box,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Reservation = () => {
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("/api/reservation/my-reservation", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setReservations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // Hanya fetch jika currentUser ada dan memiliki token
    if (currentUser) {
      fetchReservations();
    }
  }, [currentUser]);

  //filter data reservasi berdasarkan status dari query parameter
  const getFilteredReservations = () => {
    const params = new URLSearchParams(location.search);
    const status = params.get("status");
    if (status) {
      return reservations.filter(
        (reservation) => reservation.status === status
      );
    }
    return reservations;
  };

  const filteredReservations = getFilteredReservations();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{ padding: 4, bgcolor: theme.palette.background.alt, color: "white" }}
    >
      <Box>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          color={theme.palette.secondary.main}
        >
          Reservasi Saya
        </Typography>
      </Box>
      <Box>
        <Grid container>
          {/* bagian kiri */}
          <Grid item xs={12} sm={2} gap="5rem">
            <Box
              gap="0.5rem"
              sx={{
                padding: "30px",
                display: "flex", // Aktifkan flexbox
                justifyContent: "center", // Pusatkan secara horizontal
                alignItems: "center", // Pusatkan secara vertikal
                flexDirection: "column",
                borderBottom: 1,
                borderBlockColor: "secondary.main",
              }}
            >
              <Avatar
                src={currentUser.profilePicture}
                sx={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "grey",
                  border: "none",
                }}
              />
              <Typography variant="h6" color="secondary">
                {currentUser.username}
              </Typography>
            </Box>

            <Box>
              <List>
                <ListItem>
                  <Link
                    to="/account"
                    style={{
                      textDecoration: "none",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: "primary.main",
                        color: "secondary.main",
                        textAlign: "center",
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "primary.main",
                        },
                      }}
                      variant="h6"
                    >
                      AKUN
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="/reservation"
                    style={{
                      textDecoration: "none",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        textAlign: "center",
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "secondary.main",
                        },
                      }}
                      variant="h6"
                    >
                      RESERVASI
                    </Typography>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link
                    to="/whistlist"
                    style={{
                      textDecoration: "none",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: "primary.main",
                        color: "secondary.main",
                        textAlign: "center",
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "primary.main",
                        },
                      }}
                      variant="h6"
                    >
                      WHISTLIST
                    </Typography>
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Grid>

          {/* bagian kanan */}
          <Grid item xs={12} sm={10}>
            <Box
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              }}
            >
              <Grid container>
                <Grid item md={2.4} xs={4}>
                  <Link
                    to="/reservation"
                    style={{
                      textDecoration: "none",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "secondary.main",
                        },
                      }}
                      variant="body1"
                      align="center"
                    >
                      SEMUA
                    </Typography>
                  </Link>
                </Grid>
                <Grid item md={2.4} xs={4}>
                  <Link
                    to="/reservation?status=pending"
                    style={{
                      textDecoration: "none",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "secondary.main",
                        },
                      }}
                      variant="body1"
                      align="center"
                    >
                      PROSES
                    </Typography>
                  </Link>
                </Grid>
                <Grid item md={2.4} xs={4}>
                  <Link
                    to="/reservation?status=confirmed"
                    style={{
                      textDecoration: "none",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "secondary.main",
                        },
                      }}
                      variant="body1"
                      align="center"
                    >
                      DISETUJUI
                    </Typography>
                  </Link>
                </Grid>
                <Grid item md={2.4} xs={6}>
                  <Link
                    to="/reservation?status=canceled"
                    style={{
                      textDecoration: "none",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "secondary.main",
                        },
                      }}
                      variant="body1"
                      align="center"
                    >
                      BATAL
                    </Typography>
                  </Link>
                </Grid>
                <Grid item md={2.4} xs={6}>
                  <Link
                    to="/reservation?status=completed"
                    style={{
                      textDecoration: "none",
                      display: "block",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        backgroundColor: "secondary.main",
                        color: "primary.main",
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "secondary.main",
                        },
                      }}
                      variant="body1"
                      align="center"
                    >
                      SELESAI
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
            {/* data yang bisa diambil tanggal, jam, harga, note, status, gambar */}
            <Box>
              {filteredReservations.map((reservation, index) => (
                <Box
                  key={index}
                  sx={{
                    marginBottom: 2,
                    padding: 2,
                    border: `1px solid ${theme.palette.secondary.main}`,
                  }}
                ></Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Reservation;
