import { useEffect, useState } from "react";
import Header from "../../components/dashboard/Header.jsx";
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  FormLabel,
  Input,
  TextareaAutosize,
  InputAdornment,
  Stack,
  Chip,
  ImageList,
  ImageListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import app from "../../firebase.js";
import { useCreateProductMutation } from "../../redux/api/api.js";

import { useGetProductsQuery } from "../../redux/api/api.js";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const AddProduct = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const { data } = useGetProductsQuery();
  const [imageFiles, setImageFiles] = useState([]);

  const [createProduct] = useCreateProductMutation();

  useEffect(() => {
    if (data && data.length > 0) {
      const allCategories = data.flatMap((product) => product.category); // Gabungkan semua kategori
      const uniqueCategories = Array.from(new Set(allCategories)); // Hilangkan duplikat

      // Ubah format menjadi { name: ..., id: ... }
      const categoriesWithId = uniqueCategories.map((category, index) => ({
        name: category,
        id: index + 1, // Mulai dari 1
      }));

      setCategories(categoriesWithId);
    }
  }, [data]);

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleDeleteIngredient = (ingredientToDelete) => () => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToDelete)
    );
  };
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
    const storage = getStorage(app);
    const imageUrls = [];

    for (const file of imageFiles) {
      // unggah file ke firebase storage
      try {
        const fileName = new Date().getTime() + file.name; // membuat nama file unik
        const storageRef = ref(storage, `product_images/${fileName}`); //referensi file di storage

        //mulai proses upload
        const uploadTask = uploadBytesResumable(storageRef, file);

        // tunggu hingga upload selesai
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              // Menampilkan Progress upload
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is" + progress + "% done");
            },
            (error) => {
              // tangani error upload
              console.error("Error uploading image:", error);
              reject(error);
            },
            () => {
              // upload selesai, dapatkan URL gambar
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                imageUrls.push(downloadURL);
                resolve(); // selesaikan promise setelah mendapatkan URL
              });
            }
          );
        });
      } catch (error) {
        //Tangani error jika promise ditolak
        console.error("Error uploading image: ", error);
        //Anda mungkin ingin memberitau pengguna tentang error ini
      }
    }

    const productData = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      ingredients,
      category: selectedCategories,
      imageProduct: imageUrls,
    };

    console.log(productData);

    try {
      //Gunakan useCreateProductMutation untuk menyimpan produk
      const { data, error } = await createProduct(productData);

      if (data) {
        //product berhasil dibuat, lakukan tindakan selanjutnya misalnya redirect ke halaman lain
        alert("Produk berhasil ditambahkan");
        window.location.reload();
      } else if (error) {
        // tangani kesalahan saat membuat produk
        alert("Gagal menambahkan produk", error.message);
        console.error("Error createing product:", error);
      }
    } catch (error) {
      console.error("Error creating product", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Halaman Tambah Produk"
        subtitle="Pastikan data yang di masukkan valid"
      />
      <Grid container justifyContent="flex-end">
        {" "}
        {/* Bungkus tombol dengan Grid */}
        <Grid item>
          <Button
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
            TEKAN UNTUK MENAMBAHKAN
          </Button>
        </Grid>
      </Grid>
      {/* form element  */}
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
              Deskripsi Utama Produk
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 1 }}>Nama Produk</FormLabel>
                  <TextField
                    variant="outlined"
                    placeholder="nama produk harus unik"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  <FormLabel sx={{ mb: 1 }}>Stok Produk</FormLabel>
                  <TextField
                    type="number"
                    variant="outlined"
                    placeholder="0"
                    color="primary"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    InputProps={{
                      inputProps: { min: 0 },
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
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
                      <CloseIcon />{" "}
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* deskripsi Tambahan */}
          <Paper elevation={3} sx={{ p: 3, bgcolor: "background.alt" }}>
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ color: "secondary.main" }}
            >
              Dekripsi Tambahan Produk
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 1 }}>Deskripsi Produk</FormLabel>
                  <TextareaAutosize
                    minRows={6}
                    placeholder="masukkan deskripsi dari produk"
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
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel sx={{ mb: 1 }}>Bahan Produk</FormLabel>
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
                    {ingredients.map((ingredient) => (
                      <Chip
                        key={ingredient}
                        label={ingredient}
                        onDelete={handleDeleteIngredient(ingredient)}
                      />
                    ))}
                  </Stack>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          {/* pilih kategori produk */}
          <Paper elevation={3} sx={{ p: 3, mt: 3, bgcolor: "background.alt" }}>
            <Accordion sx={{ backgroundColor: "primary.main" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography
                  variant="h5"
                  component="h3"
                  gutterBottom
                  sx={{ color: "secondary.main" }}
                >
                  Pilih Kategori Produk
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
                            checked={selectedCategories.includes(category.name)}
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
      {/* Form Elements Section End */}
    </Box>
  );
};

export default AddProduct;
