import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/api/api";

const DetailProduct = () => {
  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error)
    return (
      <Typography>Terjadi Kesalahan saat mengambil data produk</Typography>
    );

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        bgcolor: "white",
      }}
    >
      {/* Main title */}
      <Box
        sx={{
          paddingTop: { xs: 1, sm: 2, md: 2 },
          paddingBottom: { xs: 1, sm: 2, md: 2 },
          bgcolor: "white",
          borderBottom: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            bgcolor: "white",
            color: "background.alt",
            letterSpacing: 1.5,
            paddingBottom: 2,
            textAlign: "center",
          }}
        >
          DETAIL PRODUK
        </Typography>
      </Box>

      {/* Product details */}
      <Grid container spacing={3} sx={{ marginTop: 1 }}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              boxShadow: 0,
              borderRadius: 0,
              height: { xs: "350px", sm: "500px", md: "480px" },
              bgcolor: "#fff8f",
              overflow: "hidden",
            }}
          >
            <Box sx={{ overflow: "hidden" }}>
              <img
                src={product.imageProduct}
                alt={product.name}
                style={{
                  width: "60%",
                  height: "100%",
                  margin: "auto",
                  //   objectFit: "cover",
                }}
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} margin="auto" pb={4}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            DESKRIPSI LENGKAP PRODUK
          </Typography>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h4" color="primary" gutterBottom>
            Rp {product.price.toLocaleString("id-ID")}
          </Typography>
          <Typography variant="body1" fontSize="1.1rem" gutterBottom>
            Stok: {product.stock}
          </Typography>
          <Typography variant="body1" fontSize="1.1rem" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="body1" fontSize="1.1rem" gutterBottom>
            <strong>Kategori:</strong> {product.category.join(", ")}
          </Typography>
          <Typography variant="body1" fontSize="1.1rem" gutterBottom>
            <strong>Bahan:</strong> {product.ingredients.join(", ")}
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: 3, borderRadius: 0 }}
            component={Link}
            to="/products"
          >
            Kembali ke Katalog
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DetailProduct;
