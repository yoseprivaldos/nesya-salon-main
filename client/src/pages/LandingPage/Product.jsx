/* eslint-disable no-unused-vars */
import React from "react";
import { FilterList, SwapVert } from "@mui/icons-material";
import {
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  Box,
  Pagination,
  Menu,
  MenuItem,
  Modal,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import { useGetProductsQuery } from "../../redux/api/api";

const Product = () => {
  const { data: products } = useGetProductsQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // jumlah produk per halaman
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortType, setSortType] = useState("name"); // Default sorting by name
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Open and close menu handlers
  const handleSortMenuOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortChange = (type) => {
    setSortType(type);
    setSortAnchorEl(null);
  };

  const handleFilterModalOpen = () => {
    setFilterModalOpen(true);
  };

  const handleFilterModalClose = () => {
    setFilterModalOpen(false);
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  // Menghitung produk yang akan ditampilkan pada halaman saat ini
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Sorting products
  const sortedProducts = products?.slice().sort((a, b) => {
    if (sortType === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortType === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  // Filtering products by selected categories
  const filteredProducts = selectedCategories.length
    ? sortedProducts?.filter((product) =>
        selectedCategories.includes(product.category)
      )
    : sortedProducts;

  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  // Get unique categories
  const uniqueCategories = [
    ...new Set(products?.map((product) => product.category)),
  ];

  return (
    <Box sx={{ bgcolor: "white", padding: { xs: 2, sm: 4, md: 4 } }}>
      {/* main title */}
      <Box
        sx={{
          paddingBottom: { xs: 1, sm: 2, md: 2 },
          bgcolor: "white",
          borderBottom: 4,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            color: "background.alt",
            letterSpacing: 1.5,
            textAlign: "center",
          }}
        >
          Katalog Produk
        </Typography>
      </Box>

      {/* filter-sort button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 1,
          paddingBottom: 1,
        }}
      >
        <Button
          variant="outlined"
          size="large"
          sx={{
            bgcolor: "background.alt",
            color: "secondary.main",
            borderRadius: 0,
            gap: 1,
          }}
          onClick={handleFilterModalOpen}
        >
          <FilterList />
          FILTER
        </Button>
        <Button
          variant="outlined"
          sx={{
            bgcolor: "background.alt",
            color: "secondary.main",
            borderRadius: 0,
            gap: 1,
          }}
          onClick={handleSortMenuOpen}
        >
          <SwapVert />
          URUTKAN
        </Button>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortMenuClose}
        >
          <MenuItem onClick={() => handleSortChange("name")}>
            Nama Produk
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("price")}>
            Harga Produk
          </MenuItem>
        </Menu>
      </Box>

      {/* KATALOG CONTENT*/}
      <Box>
        <Grid container paddingTop={5} spacing={{ xs: 1.5, sm: 2.5, md: 5 }}>
          {currentProducts?.map((product) => (
            <Grid item xs={4} sm={4} md={3} key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Paper
                  sx={{
                    borderRadius: 0,
                    bgcolor: "#fff8f",
                    height: { xs: "200px", sm: "250px", md: "380px" },
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": !isMobile
                      ? {
                          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                          transform: "translateY(-2px)",
                        }
                      : {},
                    transition: "all 0.3s ease",
                  }}
                >
                  <Box sx={{ flexBasis: "65%", overflow: "hidden" }}>
                    <img
                      src={product.imageProduct}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      padding: { xs: 0.4, sm: 1.7, md: 0.8 },
                      paddingBottom: 0,
                      flexBasis: "35%",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: { xs: 0.05, sm: 0.2, md: 0.3 },
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        component="h3"
                        sx={{
                          fontSize: {
                            xs: "0.5rem",
                            sm: "1.25rem",
                            md: "0.95rem",
                          },
                          textDecoration: "underline",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: {
                            xs: "0.4rem",
                            sm: "0.6rem",
                            md: "0.7rem",
                          },
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.description}
                      </Typography>
                    </Box>
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          sx={{
                            fontSize: {
                              xs: "0.6rem",
                              sm: "0.8rem",
                              md: "1rem",
                            },
                          }}
                        >
                          Rp {product.price.toLocaleString("id-ID")}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          sx={{
                            size: { xs: "small", sm: "medium", md: "medium" },
                            fontSize: {
                              xs: "0.4rem",
                              sm: "0.875rem",
                              md: "1rem",
                            },
                            width: "90px",
                            padding: { xs: 0.6, md: 0.7 },
                            fontWeight: "bold",
                            color: "primary.main",
                            borderRadius: 3,
                          }}
                        >
                          Detail
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredProducts?.length / productsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>

      {/* Filter Modal */}
      <Modal
        open={filterModalOpen}
        onClose={handleFilterModalClose}
        aria-labelledby="filter-modal-title"
        aria-describedby="filter-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            outline: 0,
            borderRadius: 1,
          }}
        >
          <Typography id="filter-modal-title" variant="h6" component="h2">
            Filter Kategori Produk
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              {uniqueCategories.map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategoryChange}
                      value={category}
                    />
                  }
                  label={category}
                />
              ))}
            </FormGroup>
          </FormControl>
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilterModalClose}
            >
              Terapkan
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Product;
