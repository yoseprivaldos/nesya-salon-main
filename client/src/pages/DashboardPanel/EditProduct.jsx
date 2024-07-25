/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  Paper,
  Grid,
  FormLabel,
  InputAdornment,
  TextareaAutosize,
  Stack,
  Chip,
  Input,
  ImageList,
  ImageListItem,
  IconButton,
  Accordion,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  AccordionSummary,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../redux/api/api";
import Header from "../../components/dashboard/Header";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase";

const EditProduct = () => {
  const [proses, setProses] = useState(false);
  const { productId } = useParams();
  const { data: products } = useGetProductsQuery();
  const [updateProduct, { isLoading, isError }] = useUpdateProductMutation();
  const [categories, setCategories] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [updatedProductData, setUpdatedProductData] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageProduct: [],
    ingredients: [],
    price: "",
    stock: "",
    category: [],
  });

  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    if (isLoading) {
      setShowAlert(true);
      setAlertSeverity("info");
      setAlertMessage("Proses update produk...");
    } else if (isError) {
      setShowAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Gagal update produk. coba lagi nanti");
    } else if (!isLoading && !isError && updatedProductData) {
      setShowAlert(true);
      setAlertSeverity("success");
      setAlertMessage("Berhasil update produk");
    }
  }, [isLoading, isError, updatedProductData]);

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (products && products.length > 0) {
      const allCategories = products.flatMap((product) => product.category);
      const uniqueCategories = Array.from(new Set(allCategories));

      const categoriesWithId = uniqueCategories.map((category, index) => ({
        name: category,
        id: index + 1,
      }));
      setCategories(categoriesWithId);
    }
  }, [products]);

  useEffect(() => {
    // Ambil data produk yang akan diedit berdasarkan productId
    const productToEdit = products?.find(
      (product) => product._id === productId
    );
    if (productToEdit) {
      setFormData({
        ...productToEdit,
        imageProduct: productToEdit.imageProduct || [],
        ingredients: productToEdit.ingredients || [],
        category: productToEdit.category || [],
      });
    }
  }, [productId, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddIngredient = () => {
    if (newIngredient) {
      setFormData({
        ...formData,
        ingredients: [...formData.ingredients, newIngredient],
      });
      setNewIngredient("");
    }
  };

  const handleDeleteIngredient = (ingredientToDelete) => () => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter(
        (ingredient) => ingredient !== ingredientToDelete
      ),
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);

    // Update formData.imageProduct with temporary URLs for display
    setFormData({
      ...formData,
      imageProduct: [
        ...formData.imageProduct,
        ...files.map((file) => URL.createObjectURL(file)),
      ],
    });
  };

  const handleDeleteImage = (index) => () => {
    setFormData((prevFormData) => {
      const updatedImageProduct = [...prevFormData.imageProduct];
      updatedImageProduct.splice(index, 1);

      // Hapus file dari newImages jika ada
      if (prevFormData.imageProduct[index] instanceof File) {
        const updatedNewImages = [...newImages];
        updatedNewImages.splice(
          index - (prevFormData.imageProduct.length - newImages.length),
          1
        );
        setNewImages(updatedNewImages);
      }

      return { ...prevFormData, imageProduct: updatedImageProduct };
    });
  };

  const handleCategoryChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => {
      const updatedCategories = checked
        ? [...prevFormData.category, name]
        : prevFormData.category.filter((category) => category !== name);
      return { ...prevFormData, category: updatedCategories };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProses(true);
    const storage = getStorage(app);
    const updatedImageUrls = [];

    try {
      for (const file of newImages) {
        const storageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        updatedImageUrls.push(downloadURL);
      }

      // Update product data, replacing temporary URLs with Firebase URLs
      const dataToUpdate = {
        name: formData.name,
        description: formData.description,
        // Filter out temporary URLs and use only Firebase URLs
        imageProduct:
          updatedImageUrls.length > 0
            ? updatedImageUrls
            : formData.imageProduct,
        ingredients: formData.ingredients,
        price: formData.price,
        stock: formData.stock,
        category: formData.category,
      };

      /// Gunakan useUpdateProductMutation
      await updateProduct({ productId, ...dataToUpdate })
        .unwrap()
        .then((response) => {
          //Handle Successfull response
          setAlertSeverity("success");
          setAlertMessage("Berhasil update produk");
          setUpdatedProductData(response);
          setProses(false);
        })
        .catch((error) => {
          //Handle error response
          console.error("Error updating produk: ", error);
          setAlertSeverity("error");
          setAlertMessage("Gagal update produk. coba lagi nanti");
          setProses(false);
        });

      //set UpdateProduct data setelah berhasil update
      setUpdatedProductData(dataToUpdate);

      // Reset newImages and setFormData after successful upload
      setNewImages([]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageProduct:
          updatedImageUrls.length > 0
            ? updatedImageUrls
            : prevFormData.imageProduct,
      }));
    } catch (error) {
      console.error("Error updating product:", error);
      setAlertSeverity("error");
      setAlertMessage("Gagal update produk. coba lagi nanti");
    } finally {
      setShowAlert(true);
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Edit Produk" subtitle="Ubah informasi produk" />
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

      <form onSubmit={handleSubmit}>
        {/* Deskripsi Utama Produk */}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button
              disabled={proses}
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              sx={{
                mt: 3,
                backgroundColor: "secondary.main",
                color: "primary.main",
                borderRadius: 0,
                fontWeight: "bold",
              }}
            >
              {proses ? "Memproses..." : "Simpan Perubahan"}
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={0.05}>
          <Grid item xs={12} sm={6}>
            {/* Deskripsi Utama */}
            <Paper elevation={3} sx={{ p: 3, bgcolor: "background.alt" }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ color: "secondary.main" }}
              >
                UBAH INFORMASI UTAMA
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Nama Produk</FormLabel>
                    <TextField
                      variant="outlined"
                      placeholder="nama produk harus unik"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Harga Produk</FormLabel>
                    <TextField
                      type="number"
                      variant="outlined"
                      placeholder="0"
                      color="primary"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
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
                    <FormLabel sx={{ mb: 1 }}>Stok Produk</FormLabel>
                    <TextField
                      type="number"
                      variant="outlined"
                      placeholder="0"
                      color="primary"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>

            {/* deskrpisi tambahan */}
            <Paper elevation={3} sx={{ p: 3, bgcolor: "background.alt" }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ color: "secondary.main" }}
              >
                UBAH DATA DESKRIPSI DAN BAHAN
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Deskripsi Produk</FormLabel>
                    <TextareaAutosize
                      minRows={6}
                      placeholder="masukkan deskripsi dari produk"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
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
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Brand Produk</FormLabel>
                    <TextField
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddIngredient();
                        }
                      }}
                      variant="outlined"
                      placeholder="Masukkan bahan dan tekan Enter"
                    />
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ mt: 1, flexWrap: "wrap" }}
                    >
                      {formData.ingredients.map((ingredient, index) => (
                        <Chip
                          key={index} // Perbaikan di sini: tambahkan "key" yang unik
                          label={ingredient}
                          onDelete={handleDeleteIngredient(ingredient)}
                        />
                      ))}
                    </Stack>
                  </FormControl>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            {/* field masukkan gambar */}
            <Paper elevation={3} sx={{ p: 3, bgcolor: "background.alt" }}>
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ color: "secondary.main" }}
              >
                UBAH GAMBAR PRODUK
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
                  {formData.imageProduct.map((image, index) => (
                    <ImageListItem key={index}>
                      {" "}
                      {/* Perbaikan di sini: tambahkan "key" yang unik */}
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
                        <CloseIcon />
                      </IconButton>
                    </ImageListItem>
                  ))}
                </ImageList>
              </Grid>
            </Paper>
            {/* pilih kategori produk */}
            <Paper
              elevation={3}
              sx={{ p: 3, mt: 3, bgcolor: "background.alt" }}
            >
              <Accordion sx={{ backgroundColor: "primary.main" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    variant="h5"
                    component="h3"
                    gutterBottom
                    sx={{ color: "secondary.main" }}
                  >
                    UBAH KATEGORI PRODUK
                  </Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Grid container spacing={0.5}>
                    {categories.map((category) => (
                      <Grid item xs={12} sm={6} md={4} key={category.id}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={category.name}
                              checked={formData.category.includes(
                                category.name
                              )}
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
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EditProduct;
