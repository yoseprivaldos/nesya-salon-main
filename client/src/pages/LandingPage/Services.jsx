import { Link } from "react-router-dom";
import imgService from "../../assets/tools/tools1.png";
import imgService2 from "../../assets/tools/tools2.png";
import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Sort } from "@mui/icons-material";

const dataService = [
  {
    name: "Cat Rambut Pria",
    summary:
      "Layanan warna sempurna untuk mencerahkan seluruh rambut Anda dari akar baru dan kamu akan menjadi lebih baik",
    price: 350000,
    imageService: imgService,
  },
  {
    name: "Cat Rambut Pria",
    summary: "Layanan warna sempurna untuk mencerahkan",
    price: 350000,
    imageService: imgService,
  },
  {
    name: "Cat Rambut Pria",
    summary:
      "Layanan warna sempurna untuk mencerahkan seluruh rambut Anda dari akar",
    price: 350000,
    imageService: imgService2,
  },
  {
    name: "Cat Rambut Pria",
    summary:
      "Layanan warna sempurna untuk mencerahkan seluruh rambut Anda dari akar",
    price: 350000,
    imageService: imgService,
  },
  {
    name: "Cat Rambut Pria",
    summary:
      "Layanan warna sempurna untuk mencerahkan seluruh rambut Anda dari akar",
    price: 350000,
    imageService: imgService,
  },
  {
    name: "Cat Rambut Pria",
    summary:
      "Layanan warna sempurna untuk mencerahkan seluruh rambut Anda dari akar",
    price: 350000,
    imageService: imgService,
  },
  {
    name: "Cat Rambut Pria",
    summary:
      "Layanan warna sempurna untuk mencerahkan seluruh rambut Anda dari akar",
    price: 350000,
    imageService: imgService,
  },
  {
    name: "Cat Rambut Pria",
    summary:
      "Layanan warna sempurna untuk mencerahkan seluruh rambut Anda dari akar",
    price: 350000,
    imageService: imgService,
  },
];

const filterMain = [
  { title: "Semua", path: "/services" },
  { title: "Wanita", path: "/services?womens" },
  { title: "Pria", path: "/services?mans" },
  { title: "Anak-anak", path: "/services?kids" },
  { title: "Paket Acara", path: "/services?events" },
];

const Services = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // const getFilterService = () => {};

  return (
    <>
      <Box sx={{ bgcolor: "background.alt", padding: { xs: 2, sm: 4, md: 6 } }}>
        {/* Tittle Utama */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            bgcolor: "secondary.main",
            color: "background.alt",
            paddingBottom: 2,
          }}
        >
          DAFTAR LAYANAN
        </Typography>

        {/* Filter Section */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            bgcolor: "background.alt",
            color: "secondary.main",
            marginBottom: 3,
            paddingBottom: 1,
          }}
        >
          <Grid width="68%">
            <ButtonGroup
              variant="outlined"
              aria-label="filter buttons"
              fullWidth
              fullHeight
            >
              {filterMain.map((filter) => (
                <Button
                  key={filter.title}
                  component={Link}
                  to={filter.path}
                  sx={{
                    borderRadius: 0,
                    borderColor: "secondary.main",
                    color: "secondary.main",
                    fontSize: { xs: "0.6rem", sm: "0.875rem", md: "1rem" },
                  }}
                >
                  {filter.title}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>

          <Box sx={{ width: { xs: "20%", sm: "20%", md: "10%" } }}>
            <Typography
              bgcolor="background.alt"
              color="secondary.main"
              padding={1}
              sx={{
                fontSize: { xs: "0.65rem", sm: "0.875rem", md: "1rem" },
                display: "flex",
                alignItems: "center",
                border: 1,
              }}
            >
              <Sort
                sx={{
                  fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
                  marginRight: 0.5,
                }}
              />
              FILTER
            </Typography>
          </Box>
        </Box>

        {/* SERVICE CONTENT */}
        <Grid container spacing={{ xs: 2, sm: 4, md: 8 }}>
          {dataService.map((service, index) => (
            <Grid item xs={6} sm={6} md={4} key={index}>
              <Link to={`/form-reservation`} style={{ textDecoration: "none" }}>
                <Paper
                  sx={{
                    bgcolor: "secondary.main",
                    height: { xs: "350px", sm: "520px", md: "610px" },
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
                      src={service.imageService}
                      alt={service.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      padding: { xs: 1, sm: 1.7, md: 2 },
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
                        gap: { xs: 0.05, sm: 0.6, md: 1 },
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        component="h3"
                        sx={{
                          fontSize: {
                            xs: "0.7rem",
                            sm: "1.25rem",
                            md: "1.5rem",
                          },
                          textDecoration: "underline",
                        }}
                      >
                        {service.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: {
                            xs: "0.5rem",
                            sm: "0.875rem",
                            md: "1rem",
                          },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {service.summary}
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
                              xs: "0.875rem",
                              sm: "1rem",
                              md: "1.25rem",
                            },
                          }}
                        >
                          Rp {service.price.toLocaleString("id-ID")}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          sx={{
                            fontSize: {
                              xs: "0.4rem",
                              sm: "0.875rem",
                              md: "1rem",
                            },
                            color: theme.palette.secondary.main,
                            bgcolor: "primary.main",
                          }}
                        >
                          Pesan Sekarang
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
    </>
  );
};

export default Services;
