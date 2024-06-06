import { FilterList, SwapVert } from "@mui/icons-material";
import {
  Button,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  Box,
  Modal,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import imgProduct from "../../assets/tools/tools3.png";
import imgProduct2 from "../../assets/tools/tools5.png";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useState } from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";

// const themeModal = createTheme({
//   typography: {
//     fontSize: { xs: 1, sm: 3, md: 5 },
//   },
// });

const dataProduct = [
  {
    name: "Cat Rambut Pria",
    summary: "Layanan warna sempurna akan menjadi lebih baik",
    price: 350000,
    imageProduct: imgProduct,
  },
  {
    name: "Cat Rambut Pria",
    summary: "Layanan warna sempurna untuk mencerahkan",
    price: 350000,
    imageProduct: imgProduct2,
  },
  {
    name: "Cat Rambut Pria",
    summary: "Layanan warna sempurna untuk mencerahkan seluruh",
    price: 350000,
    imageProduct: imgProduct,
  },
  {
    name: "Cat Rambut Pria",
    summary: "Layanan warna sempurna",
    price: 350000,
    imageProduct: imgProduct2,
  },
  {
    name: "Cat Rambut Pria",
    summary: "Layanan warna sempurna untuk mencerahkan seluruh rambut Anda ",
    price: 350000,
    imageProduct: imgProduct,
  },
  {
    name: "Cat Rambut Pria",
    summary: "Layanan warna sempurna untuk",
    price: 350000,
    imageProduct: imgProduct2,
  },
  {
    name: "Cat Rambut Pria",
    summary: "Layanan warna sempurna untuk mencerahkan seluruh rambut Anda",
    price: 350000,
    imageProduct: imgProduct,
  },
  {
    name: "Cat Rambut Pria",
    summary: "Layanan warna sempurna untuk mencerahkan Anda dari akar",
    price: 350000,
    imageProduct: imgProduct2,
  },
];

const Product = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openModal, setOpenModal] = useState(false);

  // const [selectedFilters, setSelectedFilters] = useState({
  //   //belum dipakai
  //   makeup: [],
  //   perawatanRambut: [],
  //   perawatanKulit: [],
  //   perawatanTubu: [],
  //   alatDanAksesoris: [],
  //   perawatanKuku: [],
  //   kategoriTambahan: [],
  // });

  // const handleFilterChange = (category, filterName, isChecked) => {
  //   //belum dipakai
  //   setSelectedFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [category]: isChecked
  //       ? [...prevFilters[category], filterName]
  //       : prevFilters[category].filter((item) => item !== filterName),
  //   }));
  // };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ bgcolor: "background.alt", padding: { xs: 2, sm: 4, md: 6 } }}>
      {/* main title */}
      <Box
        sx={{
          paddingTop: { xs: 1, sm: 2, md: 3 },
          paddingBottom: { xs: 1, sm: 2, md: 3 },
          bgcolor: "secondary.main",
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
          onClick={handleOpenModal}
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
        >
          <SwapVert />
          URUTKAN
        </Button>
      </Box>

      {/* Modal Filter */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.alt",
            color: "secondary.main",
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* <ThemeProvider theme={themeModal}> */}
          <Grid container spacing={2}>
            <Grid className="Make Up" item xs={12} sm={6} md={6}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 1,
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  Make Up
                </Typography>
                <FormGroup>
                  <Grid container alignItems="flex-start">
                    <Grid item md={6}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Foundation"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Lipstik"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Concealer"
                      />

                      <FormControlLabel control={<Checkbox />} label="Bedak" />

                      <FormControlLabel
                        control={<Checkbox />}
                        label="Hightlighter"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Blush on "
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Eyeshadow"
                      />
                    </Grid>
                    <Grid item md={6}>
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Eyeliner"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Maskara"
                      />

                      <FormControlLabel
                        control={<Checkbox />}
                        label="Lip gloss"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Pensil alis"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Setting spray"
                      />
                      <FormControlLabel
                        control={<Checkbox />}
                        label="Bronzer"
                      />
                    </Grid>
                  </Grid>
                </FormGroup>
              </Box>
            </Grid>
            <Grid className="Perawatan Rambut" item xs={6} sm={3} md={3}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 1,
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  Perawatan Rambut
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Shampo" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Conditioner"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Masker Rambut"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Minyak Rambut"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Spray Rambut"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Pewarn Rambut"
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid className="Perawatan Kulit" item xs={6} sm={3} md={3}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 1,
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  Perawatan Kulit
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Pembersih Wajah"
                  />
                  <FormControlLabel control={<Checkbox />} label="Toner" />
                  <FormControlLabel control={<Checkbox />} label="Serum" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Masker Wajah"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Scrub Wajah"
                  />
                  <FormControlLabel control={<Checkbox />} label="Pelembab" />
                </FormGroup>
              </Box>
            </Grid>

            <Grid className="Perawatan Tubuh" item xs={6} sm={3} md={3}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 1,
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  Perawatan Tubuh
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Sabun Mandi"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Lulur Tubuh"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Body Lotion"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Body Butter"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Minyak Tubuh"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Minyak Pijat"
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid className="Alat dan Aksesoris" item xs={6} sm={3} md={3}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 1,
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  Alat dan Aksesori
                </Typography>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Kuas makeup"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Spons makeup"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Sisir dan sikat"
                  />
                  <FormControlLabel control={<Checkbox />} label="Alat cukur" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Minyak kutikula"
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid className="Perawatan Kuku" item xs={6} sm={3} md={3}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 1,
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  Perawatan Kuku
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Kuteks" />
                  <FormControlLabel control={<Checkbox />} label="Base coat" />
                  <FormControlLabel control={<Checkbox />} label="Top coat" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Penghapus kuteks"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Minyak kutikula"
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid className="Kategori Tambahan" item xs={6} sm={3} md={3}>
              <Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{
                    mb: 1,
                    textDecoration: "underline",
                    textDecorationColor: "white",
                  }}
                >
                  Kategori Tambahan
                </Typography>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Pria" />
                  <FormControlLabel control={<Checkbox />} label="Wanita" />
                </FormGroup>
              </Box>
            </Grid>
          </Grid>
          {/* </ThemeProvider> */}

          <Button
            variant="contained"
            onClick={handleCloseModal}
            sx={{ borderRadius: 0, color: "secondary.main" }}
          >
            Terapkan Filter
          </Button>
        </Box>
      </Modal>

      {/* KATALOG CONTENT*/}
      <Box>
        <Grid container spacing={{ xs: 1.5, sm: 2.5, md: 5 }}>
          {dataProduct.map((product, index) => (
            <Grid item xs={4} sm={4} md={3} key={index}>
              <Link to="/">
                <Paper
                  sx={{
                    borderRadius: 0,
                    bgcolor: "secondary.main",
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
                            md: "1.3rem",
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
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {product.summary}
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
                              sm: "1rem",
                              md: "1.2rem",
                            },
                          }}
                        >
                          Rp {product.price.toLocaleString("id-ID")}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          sx={{
                            size: { xs: "small", sm: "medium", md: "medium" },
                            fontSize: {
                              xs: "0.4rem",
                              sm: "0.875rem",
                              md: "1rem",
                            },
                            color: theme.palette.secondary.main,
                            bgcolor: "primary.main",
                            borderRadius: 0,
                            padding: { xs: 0.6, md: 1 },
                          }}
                        >
                          Lihat Detail
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
    </Box>
  );
};

export default Product;
