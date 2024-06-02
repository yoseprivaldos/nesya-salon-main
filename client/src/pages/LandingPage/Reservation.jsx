import {
  Box,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const dataReservation = [
  {
    name: "reservasi 1 selesai",
    status: "selesai",
  },
  {
    name: "reservasi 2 selesai",
    status: "selesai",
  },
  {
    name: "reservasi 3 selesai",
    status: "selesai",
  },
  {
    name: "reservasi 4 selesai",
    status: "selesai",
  },
  {
    name: "reservasi 1 proses",
    status: "proses",
  },
  {
    name: "reservasi 2 proses",
    status: "proses",
  },
  {
    name: "reservasi 3 proses",
    status: "proses",
  },
  {
    name: "reservasi 4 proses",
    status: "proses",
  },
  {
    name: "reservasi 1 batal",
    status: "batal",
  },
  {
    name: "reservasi 2 batal",
    status: "batal",
  },
  {
    name: "reservasi 3 batal",
    status: "batal",
  },
  {
    name: "reservasi 4 proses",
    status: "batal",
  },
];

const Reservation = () => {
  const theme = useTheme();
  const { currentUser } = useSelector((state) => state.user);

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
                  width: "60%",
                  height: "60%",
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
                <Grid item xs={3} md={3}>
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
                <Grid item xs={3} md={3}>
                  <Link
                    to="/reservation/proses"
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
                <Grid item xs={3} md={3}>
                  <Link
                    to="/reservation/batal"
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
                <Grid item xs={3} md={3}>
                  <Link
                    to="/reservation/selesai"
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Reservation;
