/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@emotion/react";
import { useGetProductsQuery } from "../../redux/api/api.js";
import { useEffect, useState } from "react";

const Product = ({
  name,
  description,
  imageProduct,
  ingredients,
  price,
  stock,
  category,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardMedia
        component="img"
        height="90"
        image={imageProduct}
        alt={name}
        sx={{ objectFit: "contain" }} // Atur bagaimana gambar akan disesuaikan
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
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Lihat Lebih
        </Button>
        <Button variant="primary" size="small">
          Edit Produk
        </Button>
      </CardActions>
    </Card>
  );
};

const Products = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data, isLoading, refetch } = useGetProductsQuery();

  // Refetch data secara manual (misalnya, setelah melakukan perubahan data)
  useEffect(() => {
    refetch();
  }, [refetch]);

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
          {data.map(
            ({
              _id,
              name,
              ingredients,
              description,
              price,
              category,
              stock,
              imageProduct,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                ingredients={ingredients}
                description={description}
                price={price}
                category={category}
                stock={stock}
                imageProduct={imageProduct}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};
export default Products;
