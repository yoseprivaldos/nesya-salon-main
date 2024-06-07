import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../../redux/api/api";
import Header from "../../components/dashboard/Header";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data: products } = useGetProductsQuery();
  const [updateProduct] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageProduct: "", // Atau bisa menggunakan komponen upload gambar
    ingredients: "",
    price: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    // Ambil data produk yang akan diedit berdasarkan productId
    const productToEdit = products?.find(
      (product) => product._id === productId
    );
    if (productToEdit) {
      setFormData(productToEdit);
    }
  }, [productId, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ id: productId, ...formData }).unwrap();
      navigate("/dashboard/products"); // Arahkan kembali ke halaman daftar produk setelah berhasil
    } catch (error) {
      console.error("Error updating product:", error);
      // Tangani error, misalnya tampilkan pesan error
    }
  };

  return (
    <Box m="20px">
      <Header title="Edit Produk" subtitle="Ubah informasi produk" />
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nama Produk"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Deskripsi"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        {/* Input untuk gambar produk (misalnya menggunakan komponen upload) */}
        <TextField
          label="Bahan-bahan"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Harga"
          variant="outlined"
          fullWidth
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Stok"
          variant="outlined"
          fullWidth
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Kategori</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            input={<OutlinedInput label="Kategori" />}
          >
            <MenuItem value="perawatan rambut">Perawatan Rambut</MenuItem>
            <MenuItem value="perawatan wajah">Perawatan Wajah</MenuItem>
            {/* Tambahkan kategori lainnya sesuai kebutuhan */}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Simpan Perubahan
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct;
