/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@emotion/react";
import {
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../../redux/api/api.js";
import { useEffect, useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useLocation, useNavigate } from "react-router-dom";

const Product = ({
  name,
  description,
  imageProduct,
  ingredients,
  price,
  stock,
  category,
  _id,
  onDelete,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const imageUrl =
    imageProduct?.length > 0 ? imageProduct[0] : "/path/to/default-image.jpg";

  //state untuk menu setiap produk
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditClick = () => {
    navigate(`edit-product/${_id}`);
    handleClose();
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        position: "relative",
      }}
    >
      <IconButton
        aria-label="more"
        id={`long-button-${_id}`} // ID unik untuk setiap menu
        aria-controls={open ? `long-menu-${_id}` : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id={`long-menu-${_id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          ".MuiMenu-paper": {
            maxHeight: 48 * 4.5,
            width: "20ch",
            mr: -8, // Margin negatif di kanan (sesuaikan nilainya)
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>{" "}
        <MenuItem onClick={onDelete}>Hapus</MenuItem>{" "}
      </Menu>

      <CardMedia
        component="img"
        height="90"
        image={imageUrl}
        alt={name}
        sx={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Rp.{Number(price).toFixed(2)}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Stock: {stock}
        </Typography>
      </CardContent>

      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>Deskripsi Produk:</Typography>
          <Typography>{description}</Typography>
          <Typography>Bahan:</Typography>
          <Typography>{ingredients}</Typography>
        </CardContent>
      </Collapse>
      <CardActions sx={{ display: "flex" }}>
        <Button
          fullWidth
          variant="primary"
          size="large"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Lihat Lebih
        </Button>
      </CardActions>
    </Card>
  );
};

const Products = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data, isLoading, refetch } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const location = useLocation();

  // Refetch data secara manual (misalnya, setelah melakukan perubahan data)
  useEffect(() => {
    refetch();
  }, [refetch, location.pathname]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Data Katalog Salon" subtitle="Lihat atau edit produk." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map((product) => (
            <Product
              key={product._id}
              {...product}
              onDelete={() => {
                deleteProduct(product._id)
                  .unwrap() // Unwrap promise untuk mendapatkan hasil atau error
                  .then(() => {
                    refetch(); // Refetch data setelah penghapusan berhasil
                  })
                  .catch((error) => {
                    // Tangani error jika ada
                    console.error("Error deleting product:", error);
                  });
              }}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};
export default Products;
