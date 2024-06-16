import {
  Box,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
  Avatar,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import ReservationCart from "../../components/LandingPage/ReservationCart";
import ReservationItem from "../../components/LandingPage/ReservationItem";

ReservationCart;

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
        const response = await fetch("/api/reservations/my-reservation", {
          credentials: "include",
        });

        if (response.status === 404) {
          console.log("Kamu belum membuat reservasi");
          setReservations([]); // Set data reservasi menjadi array kosong
        } else if (!response.ok) {
          throw new Error(
            `Network response was not ok (status: ${response.status})`
          );
        } else {
          const data = await response.json();
          setReservations(data);
        }
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

  const handleCancelReservation = async (reservationId) => {
    try {
      // Perform cancellation logic
      // Example: call API or update state directly
      const updatedReservations = reservations.map((reservation) => {
        if (reservation._id === reservationId) {
          return { ...reservation, status: "canceled" };
        }
        return reservation;
      });
      setReservations(updatedReservations);
    } catch (error) {
      console.error("Failed to cancel reservation", error);
    }
  };

  const filteredReservations = getFilteredReservations();

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ padding: 4, bgcolor: "white", color: "white" }}>
      <Box>
        <Typography
          variant="h3"
          gutterBottom
          fontWeight="bold"
          color="primary.main"
        >
          Reservasi Saya
        </Typography>
      </Box>
      <Box>
        <Grid container backgroundColor="background.alt">
          {/* bagian kiri */}
          <Grid item xs={12} sm={2} gap="5rem" border={1}>
            <Box
              gap="0.5rem"
              sx={{
                padding: "30px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
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
                    to="/wishlist"
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
                      WHISHLIST
                    </Typography>
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Grid>

          {/* bagian kanan */}
          <Grid item xs={12} sm={10} border={1}>
            {/* filter button */}
            <Box>
              <Grid
                container
                backgroundColor="white"
                sx={{
                  paddingLeft: { xs: 0, md: 2 },
                  paddingRight: { xs: 0, md: 2 },
                }}
              >
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
                        backgroundColor: "primary.main",
                        color: "secondary.main",
                        fontWeight: "bold",
                        padding: 1,
                        borderRight: 2,
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "primary.main",
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
                        backgroundColor: "primary.main",
                        color: "secondary.main",
                        padding: 1,
                        fontWeight: "bold",
                        borderRight: 2,
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "primary.main",
                        },
                      }}
                      variant="body1"
                      align="center"
                    >
                      DIPROSES
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
                        backgroundColor: "primary.main",
                        color: "secondary.main",
                        padding: 1,
                        borderRight: 2,
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "primary.main",
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
                        backgroundColor: "primary.main",
                        color: "secondary.main",
                        fontWeight: "bold",
                        borderRight: 2,
                        padding: 1,
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "primary.main",
                        },
                      }}
                      variant="body1"
                      align="center"
                    >
                      DIBATALKAN
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
                        backgroundColor: "primary.main",
                        color: "secondary.main",
                        padding: 1,
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "secondary.main",
                          color: "primary.main",
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
            <Box display="flex" backgroundColor="white">
              {filteredReservations.length === 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    margin: "auto",
                    padding: 2,
                    textAlign: "center",
                    border: `1px solid ${theme.palette.secondary.main}`,
                  }}
                >
                  <Typography variant="h6">
                    Kamu belum membuat reservasi.
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/services"
                    sx={{ marginTop: 2 }}
                  >
                    Buat Reservasi
                  </Button>
                </Box>
              ) : (
                <Grid
                  container
                  m={0}
                  columnSpacing={2}
                  alignContent="center"
                  alignItems="center"
                  sx={{
                    py: { xs: 1, md: 2 },
                    pr: { xs: 2, md: 2 },
                    pl: { xs: 0 },
                  }}
                >
                  {filteredReservations.map((reservation) => (
                    <Grid item xs={12} sm={12} md={6} key={reservation._id}>
                      <ReservationItem
                        id={reservation._id}
                        services={reservation?.services}
                        date={reservation?.date}
                        status={reservation?.status}
                        note={reservation?.note}
                        startTime={reservation?.startTime}
                        endTime={reservation?.endTime}
                        totalPrice={reservation.totalPrice}
                        image={reservation?.services[0]?.imageService[0]}
                        message={reservation?.reservationMessage}
                        onCancelReservation={handleCancelReservation}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Reservation;
