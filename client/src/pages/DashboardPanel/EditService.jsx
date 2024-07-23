/* eslint-disable no-unused-vars */
import React from "react";
import {
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
  Box,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  useGetCategoryQuery,
  useGetServiceByIdQuery,
  useUpdateServiceMutation,
} from "../../redux/api/api";

import Header from "../../components/dashboard/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";

const EditService = () => {
  const [proses, setProses] = useState(false);
  const { data: categories, isLoading: isLoadingCategories } =
    useGetCategoryQuery();
  const { serviceId } = useParams();
  const { data: serviceData, isLoading: isLoadingServiceData } =
    useGetServiceByIdQuery(serviceId, {
      skip: !serviceId,
    });
  const [updateService, { isLoading, isError }] = useUpdateServiceMutation();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (isLoading) {
      setShowAlert(true);
      setAlertSeverity("info");
      setAlertMessage("memprosess....");
    } else if (isError) {
      setShowAlert(isError);
      setAlertSeverity("error");
      setAlertMessage("Gagal updated service. Coba lagi nanti");
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (serviceData && categories) {
      setName(serviceData.name || "");
      setPrice(serviceData.price || "");
      setDuration(serviceData.duration || "");
      setDescription(serviceData.description || "");
      setImages(serviceData.imageService || []);
      setExistingImageUrls(serviceData.imageService || []); // Set existing image URLs

      const initialCategories = serviceData.categories.map(
        (category) => category._id
      );
      setSelectedCategories(initialCategories);
    }
  }, [serviceData, categories]);

  const handleCategoryChange = (event) => {
    const { name } = event.target;
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(name)
        ? prevCategories.filter((category) => category !== name)
        : [...prevCategories, name]
    );
  };

  const handleImageChange = (event) => {
    const newImageFiles = Array.from(event.target.files);
    if (newImageFiles.length > 0) {
      setImageFiles((prevImageFiles) => [...prevImageFiles, ...newImageFiles]);
      const newImageUrls = newImageFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImageUrls]);
    }
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
    setExistingImageUrls((prevUrls) =>
      prevUrls.filter((url) => url !== imageToDelete)
    );
  };

  const handleSubmit = async () => {
    setProses(true);
    const storage = getStorage(app);
    const uploadImage = async (file) => {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `service_image/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // eslint-disable-next-line no-unused-vars
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.error("Error uploading image:", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    try {
      const uploadedImageUrls = await Promise.all(imageFiles.map(uploadImage));
      const allImageUrls = [...existingImageUrls, ...uploadedImageUrls];

      const updatedServiceData = {
        name,
        price: parseFloat(price),
        duration: parseFloat(duration),
        description,
        categories: selectedCategories,
        imageService: allImageUrls, // Use combined image URLs
      };

      console.log(updatedServiceData);

      const { data, error } = await updateService({
        serviceId,
        ...updatedServiceData,
      });

      if (data) {
        setImageFiles([]);
        setImages(data.imageService);
        setExistingImageUrls(data.imageService);
        setShowAlert(true);
        setAlertSeverity("success");
        setAlertMessage("Berhasil update layanan");
        setProses(false);
      } else if (error) {
        console.error("Error saat mengupdate layanan");
        setShowAlert(true);
        setAlertSeverity("error");
        setAlertMessage("Gagal mengupdate layanan.Coba lagi nanti");
      }
    } catch (error) {
      console.error("Error saat update layanan", error);
      setShowAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Gagal update layanan. Coba lagi nanti");
    }
  };

  if (isLoadingCategories || isLoadingServiceData) {
    return <div>Loading...</div>;
  }

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
      <Header title="Halaman Edit Layanan" subtitle="Ubah informasi layanan" />
      {/* Button confirmation */}

      <Grid container justifyContent="flex-end">
        {/* button konfirmasi  */}
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
            {proses ? "Memproses..." : "Simpan Perubahan"}
          </Button>
        </Grid>
      </Grid>

      {/* form section */}
      <Grid container spacing={3} mt={0.05}>
        <Grid item xs={12} sm={6}>
          {/* deskripsi utama */}
          <Paper elevation={3} sx={{ p: 3, bgcolor: "background.alt" }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ color: "secondary.main" }}
            >
              Deskripsi Utama Layanan
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
              Ubah Gambar Layanan
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
                      alt="Gambar Layanan"
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

export default EditService;
