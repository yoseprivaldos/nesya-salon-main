import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import OAuth from "../../components/LandingPage/OAuth";
import {
  signInStart,
  signInSuccess,
  signInFailure,
  clearNotification,
} from "../../redux/user/userSlice";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import { Alert, Snackbar } from "@mui/material";
import bannerImg from "../../assets/Banner.jpg";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const notification = useSelector((state) => state.user.notification);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (notification) {
      setOpen(true);
      // Clear notification after displaying it
      setTimeout(() => {
        dispatch(clearNotification());
        setOpen(false);
      }, 5000); // Hapus pesan setelah 5 detik
    }
  }, [notification, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`Akun belum terdaftar`);
        } else if (res.status === 401) {
          throw new Error("Password Salah");
        } else {
          throw new Error(`HTTP error ! status : ${res.status}`);
        }
      }
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      if (data.role === "admin" || data.role === "superadmin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error));
      setShowError(true);
    }
  };

  return (
    <>
      {/* notifikasi jika ada */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          {notification}
        </Alert>
      </Snackbar>

      <Grid
        className="login"
        container
        component="main"
        sx={{
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bannerImg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "primary"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          fontWeight="bold"
          backgroundColor="#fffff0"
        >
          <Box
            sx={{
              boxShadow: "none",
              my: 14,
              mx: 7,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography component="h1" variant="h2" fontWeight="bold">
              Halaman Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Alamat Email "
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />

              <Button
                disabled={loading}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                | atau |
              </Typography>
              <OAuth />

              <Grid container justifyContent="space-between">
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Belum punya akun? Daftar"}
                  </Link>
                </Grid>
                {showError && (
                  <Grid item>
                    <Typography variant="body2" color="red">
                      {error.message || "Terjadi kesalahan di sisi server!"}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
