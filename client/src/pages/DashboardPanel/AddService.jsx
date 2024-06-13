import Header from "../../components/dashboard/Header";
import {
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Input,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  useGetCategoryQuery,
  useCreateServiceMutation,
} from "../../redux/api/api.js";
import { useEffect, useState } from "react";
import app from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const AddService = () => {
  const [proses, setProses] = useState(false);
  const { data: categories } = useGetCategoryQuery();
  const [createService, { isLoading, isError }] = useCreateServiceMutation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [createdServiceData, setCreatedServiceData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (isLoading) {
      setShowAlert(true);
      setAlertSeverity("info");
      setAlertMessage("memprosess....");
    } else if (isError) {
      setShowAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Gagal membuat Service. Coba lagi nanti");
    } else if (!isLoading && !isError && createdServiceData) {
      setShowAlert(true);
      setAlertSeverity("success");
      setAlertMessage("Berhasil update produk");
    }
  }, [isLoading, isError, createdServiceData]);

  const handleImageChange = (event) => {
    const newImageFiles = Array.from(event.target.files);
    setImageFiles((prevImageFiles) => [...prevImageFiles, ...newImageFiles]);

    //membuat preview gambar dan menyimpan URL-nya di state 'image'
    const newImageUrls = newImageFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImageUrls]);
  };

  const handleDeleteImage = (imageToDelete) => () => {
    setImages((prevImages) =>
      prevImages.filter((image) => image !== imageToDelete)
    );
    setImageFiles((prevImageFiles) =>
      prevImageFiles.filter(
        (file) => URL.createObjectURL(file) !== imageToDelete
      )
    );
  };

  const handleCategoryChange = (event) => {
    const { name } = event.target;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(name)
        ? prevCategories.filter((category) => category !== name)
        : [...prevCategories, name]
    );
  };

  const handleSubmit = async () => {
    setProses(true);
    const storage = getStorage(app);
    const imageUrls = [];

    for (const file of imageFiles) {
      //unggah file ke firebase storage
      try {
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, `service_images/${fileName}`); // referensi file di storage

        //mulai proses upload
        const uploadTask = uploadBytesResumable(storageRef, file);

        //tunggu hingga upload selesai
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              //menampilkan progress upload
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is" + progress + "% done");
            },
            (error) => {
              //tangani error upload
              console.error("Error uploading image:", error);
              reject(error);
            },
            () => {
              //upload selesai, dapatkan URL gambar
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                imageUrls.push(downloadURL);
                resolve(); //selesaikan promise setelah mendapatkan URL
              });
            }
          );
        });
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }

    const serviceData = {
      name,
      price: parseFloat(price),
      duration: parseFloat(duration),
      description,
      categories: selectedCategories,
      imageService: imageUrls,
    };

    try {
      const { data, error } = await createService(serviceData);
      if (data) {
        setCreatedServiceData(data);
        setShowAlert(true);
        setAlertSeverity("success");
        setAlertMessage("Berhasil membuat layanan");
        setProses(false);

        //reset form
        setName("");
        setPrice("");
        setDuration("");
        setDescription("");
        setImages([]);
        setSelectedCategories([]);
        setImageFiles([]);
      } else if (error) {
        //tangain kesalahan saat membuat produk
        console.error("Error saat membuat service");
        setShowAlert(true);
        setAlertSeverity("error");
        setAlertMessage("Gagal membuat Service. Coba Lagi Nanti");
        setProses(false);
      }
    } catch (error) {
      console.error("Error Creating Service", error);
      setShowAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Gagal membuat Service. Coba lagi nanti");
      setProses(false);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseAlert} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Header
        title="Halaman Tambah Layanan"
        subtitle="Pastikan data layanan yang dimasukkan valid"
      />
      {/* Button confirmation */}
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button
            disabled={proses}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 3,
              backgroundColor: "secondary.main",
              color: "primary.main",
              borderRadius: 0,
              fontWeight: "bold",
            }}
            onClick={handleSubmit}
          >
            {proses ? "Memproses..." : "TEKAN UNTUK MENAMBAHKAN"}
          </Button>
        </Grid>
      </Grid>

      {/* form section */}
      <Grid container spacing={3} mt={0.5}>
        <Grid item xs={12} sm={6}>
          {/* deskripsi utama */}
          <Paper elevation={3} sx={{ p: 3, bgcolor: "background.alt" }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ color: "secondary.main" }}
            >
              Deskripsi Utama Produk
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 1 }}>Nama Layanan</FormLabel>
                  <TextField
                    variant="outlined"
                    placeholder="nama layanan harus unik"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 1 }}>Harga Layanan</FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder="0"
                    color="primary"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">Rp</InputAdornment>
                      ),
                      inputProps: { min: 0 },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 1 }}>
                    Durasi Layanan (dalam menit){" "}
                  </FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder="0"
                    color="primary"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    InputProps={{
                      inputProps: { min: 30 },
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 1 }}>Deskripsi Layanan</FormLabel>
                  <TextareaAutosize
                    minRows={6}
                    placeholder="masukkan deskripsi dari layanan"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      fontSize: "16px",
                      lineHeight: 1.5,
                      resize: "vertical",
                      outline: "none",
                      color: "black",
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* pilih kategori layanan */}
          <Paper elevation={3} sx={{ p: 3, bgcolor: "background.alt" }}>
            <Accordion sx={{ backgroundColor: "primary.main" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ color: "secondary.main" }}
                >
                  Pilih Kategori Layanan
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                <Grid container spacing={0.5}>
                  {categories?.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category._id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={category._id}
                            sx={{
                              "&.Mui-checked": {
                                color: "orange", // Warna saat dicentang
                              },
                              "& .MuiSvgIcon-root": {
                                // Menargetkan ikon checkbox
                                borderRadius: "50%",
                              },
                              color: "grey", // Warna default
                            }}
                            checked={selectedCategories.includes(category._id)}
                            onChange={handleCategoryChange}
                          />
                        }
                        label={category.name}
                      />
                    </Grid>
                  ))}
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Paper>

          {/* field masukkan gambar */}
          <Paper elevation={3} sx={{ p: 3, mt: 3, bgcolor: "background.alt" }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ color: "secondary.main" }}
            >
              Masukkan Gambar Produk
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Input
                    type="file"
                    inputProps={{ multiple: true }}
                    onChange={handleImageChange}
                  />
                </FormControl>
              </Grid>

              <ImageList cols={3} rowHeight={165} sx={{ p: 3 }}>
                {images.map((image) => (
                  <ImageListItem key={image}>
                    <img
                      src={image}
                      alt="Gambar Produk"
                      loading="lazy"
                      style={{
                        cursor: "pointer",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <IconButton
                      arial-label="delete"
                      onClick={handleDeleteImage(image)}
                      sx={{
                        position: "absolute",
                        top: 9,
                        right: 9,
                        color: "primary.main",
                      }}
                    >
                      {" "}
                      <CloseIcon />
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddService;
