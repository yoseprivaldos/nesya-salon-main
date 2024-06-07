import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  Typography,
  Divider,
  useTheme,
  Avatar,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase.js";

const Account = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({});
  const [data, setData] = useState({});
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  //User Id yang login saat ini
  const userId = currentUser._id;

  //fetch ke "/api/user/:id" mengambil data user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setFormData(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, [userId]);

  const handleFileUpload = useCallback(
    async (image) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "stage_change",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        () => {
          setImageError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
            setFormData({ ...formData, profilePicture: downloadURL })
          );
        }
      );
    },
    [formData]
  );

  //jika ada image upload
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image, handleFileUpload]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //handleSubmit -- untuk update data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Profil berhasil diperbarui");
      } else {
        //handle error here
        const error = await response.json();
        console.error("Error updating user data: ", error);
        alert("Terjadi kesalahan saat memperbarui profil");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      alert("Terjadi kesalahan saat memperbarui profill");
    }
  };

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
          Akun Saya
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
                src={data.profilePicture}
                sx={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "grey",
                  border: "none",
                  objectFit: "cover",
                }}
              />
              <Typography variant="h6" color="secondary">
                {data.username}
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
                margin: "2px 2px 0px 2px",
                padding: 2,
              }}
            >
              <Typography variant="h3">Profil Saya</Typography>
              <Typography variant="subtitle1" mb={3}>
                Kelola informasi profil Anda untuk mengontrol, melindungi, dan
                mengamankan akun
              </Typography>
              <Divider
                sx={{
                  marginTop: "1rem",
                  borderBottomWidth: 5,
                  borderColor: "primary.main",
                }}
              />
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                  {/* sebelah kiri form */}
                  <Grid item xs={12} md={8}>
                    <Box marginTop="2rem">
                      <Typography>Ubah Username</Typography>
                      <TextField
                        margin="dense"
                        fullWidth
                        id="username"
                        name="username"
                        value={formData.username ?? ""}
                        onChange={handleChange}
                        autoComplete="username"
                        autoFocus
                      />
                      <Typography>Ubah Email</Typography>
                      <TextField
                        margin="dense"
                        fullWidth
                        id="email"
                        name="email"
                        value={formData.email ?? ""}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                      <Typography>Ubah Nomor HP</Typography>
                      <TextField
                        margin="dense"
                        fullWidth
                        id="nomorhp"
                        name="nomorHp"
                        value={formData.nomorHp ?? ""}
                        onChange={handleChange}
                        autoComplete="noHp"
                      />
                      <Typography mb="0.5px" mt="3px">
                        Ubah Password
                      </Typography>
                      <TextField
                        margin="dense"
                        fullWidth
                        id="password"
                        name="password"
                        value={formData.password ?? ""}
                        onChange={handleChange}
                        autoComplete="current-password"
                        type="password"
                      />
                      <Typography mb="0.5px" mt="3px">
                        Ubah Alamat
                      </Typography>
                      <TextField
                        margin="dense"
                        fullWidth
                        id="alamat"
                        name="Alamat"
                        value={formData.alamat ?? ""}
                        onChange={handleChange}
                        autoComplete="address"
                      />
                    </Box>
                  </Grid>
                  {/* Bagian ubah image -- sebelah kanan form */}
                  <Grid xs={12} md={4}>
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      height="100%"
                    >
                      <Box sx={{ my: "auto" }}>
                        <input
                          type="file"
                          ref={fileRef}
                          hidden
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                        />

                        <Avatar
                          src={
                            formData.profilePicture ||
                            currentUser.profilePicture
                          }
                          onClick={() => fileRef.current.click()}
                          sx={{
                            cursor: "pointer",
                            backgroundColor: "grey",
                            width: "150px",
                            height: "150px",
                          }}
                        />
                        <Typography variant="body2" align="center">
                          Pilih Gambar
                        </Typography>
                        <Typography variant="body2" align="center">
                          {imageError ? (
                            <span style={{ color: "red" }}>
                              Error uploading image (ukuran file maksimal 2MB)
                            </span>
                          ) : imagePercent > 0 && imagePercent < 100 ? (
                            <span
                              style={{ color: "grey" }}
                            >{`Uploading: ${imagePercent} %`}</span>
                          ) : imagePercent === 100 ? (
                            <span style={{ color: "green" }}>
                              Upload Image Berhasil
                            </span>
                          ) : null}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Konfirmasi
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Account;
