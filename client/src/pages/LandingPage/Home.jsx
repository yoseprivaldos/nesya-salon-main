// import ToolsSection from "../../components/LandingPage/ToolsSection";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import tools1 from "../../assets/tools/tools1.png";
import tools2 from "../../assets/tools/tools2.png";
import tools3 from "../../assets/tools/tools3.png";
import tools4 from "../../assets/tools/tools4.png";
import tools5 from "../../assets/tools/tools5.png";
import SwiperCore from "swiper";

// Initialize Swiper core components
SwiperCore.use([Navigation]);
const tools = [
  {
    nameTools: "Layanan",
    image: tools1,
    path: "/services",
  },
  {
    nameTools: "KATALOG",
    image: tools3,
    path: "/products",
  },
  {
    nameTools: "SALON",
    image: tools2,
    path: "/salons",
  },
  {
    nameTools: "PENDIDIKAN",
    image: tools4,
    path: "educations",
  },
  {
    nameTools: "PEKERJAAN",
    image: tools5,
    path: "jobs",
  },
];

const catalogs = [
  {
    id: "12345678",
    name: "Shampo",
    deskripsi: "Shampo ini dapat membuat rambut anda sehat",
    price: 75000,
    image: tools3,
  },
  {
    id: "12345678",
    name: "Shampo",
    deskripsi: "Shampo ini dapat membuat rambut anda sehat",
    price: 75000,
    image: tools3,
  },
  {
    id: "12345678",
    name: "Shampo",
    deskripsi: "Shampo ini dapat membuat rambut anda sehat",
    price: 75000,
    image: tools3,
  },
  {
    id: "12345678",
    name: "Shampo",
    deskripsi: "Shampo ini dapat membuat rambut anda sehat",
    price: 75000,
    image: tools3,
  },
  {
    id: "12345678",
    name: "Shampo",
    deskripsi: "Shampo ini dapat membuat rambut anda sehat",
    price: 75000,
    image: tools3,
  },
];

export default function Home() {
  const theme = useTheme();
  const handleImageClick = (path) => {
    window.location.href = path;
  };

  return (
    <>
      {/* Swiper tool function */}
      <Box
        sx={{ padding: "50px", backgroundColor: theme.palette.background.alt }}
      >
        <Swiper
          slidesPerView={4}
          spaceBetween={16}
          navigation
          modules={[Navigation]}
          breakpoints={{
            0: {
              // Breakpoint untuk layar xs (0px ke atas)
              slidesPerView: 3,
            },

            600: {
              // sm (600px ke atas)
              slidesPerView: 4,
            },
            900: {
              // md (900px ke atas)
              slidesPerView: 4,
            },
          }}
        >
          {tools.map((tool, index) => (
            <SwiperSlide key={index}>
              <Paper
                onClick={() => handleImageClick(tool.path)}
                sx={{
                  height: { xs: "150px", sm: "250px", md: "300px" },
                  display: "flex",
                  flexDirection: "column",
                  "&:hover img ": {
                    transform: "scale(1.05)",
                  },
                  "&:hover Button ": {
                    transform: "scale(1.05)",
                  },
                  transition: "transform 0.3s ease-in-out",
                  cursor: "pointer",
                }}
              >
                <Box sx={{ flexBasis: "70%", overflow: "hidden" }}>
                  <img
                    src={tool.image}
                    alt={tool.nameTools}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box sx={{ flexBasis: "30%", overflow: "hidden" }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: 0,
                      height: "100%",
                      fontSize: {
                        xs: "1rem",
                        sm: "1rem",
                        md: "2rem",
                      },
                      color: theme.palette.secondary.main,
                      bgcolor: "primary.main",
                    }}
                  >
                    {tool.nameTools}
                  </Button>
                </Box>
              </Paper>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* tagline 1 */}
      <Box sx={{ backgroundColor: theme.palette.secondary.main, padding: 0 }}>
        <Grid container spacing={0} alignContent="center">
          <Grid item sm={5} xs={12}>
            {/* Gambar */}
            <Box
              component="img"
              src={tools1}
              sx={{
                width: "100%",
                height: { xs: "350px", sm: "500px", md: "700px" },
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item sm={7} xs={12}>
            <Box
              backgroundColor={theme.palette.secondary.main}
              sx={{
                height: "100%",
              }}
            >
              <Box
                padding={4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  height: "100%",
                }}
              >
                <Box
                  className="main-tittle"
                  sx={{
                    mx: "auto",
                    width: { xs: "350px", sm: "540px", md: "550px" },
                  }}
                >
                  <Typography
                    variant="h1"
                    fontWeight="bold"
                    sx={{
                      fontSize: { xs: "1.6rem", sm: "1.25rem", md: "4rem" },
                    }}
                  >
                    Waktu Berharga,
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "1.25rem", md: "3rem" },
                    }}
                  >
                    Booking Salon Lebih Cepat dan Mudah.
                  </Typography>
                </Box>
                <Box
                  className="second-tittle"
                  sx={{
                    mx: "auto",
                    width: { xs: "350px", sm: "540px", md: "550px" },
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      marginTop: { xs: "0.8rem", sm: "1.25rem", md: "2.5rem" },
                      fontSize: { xs: "1.2rem", sm: "1.25rem", md: "2rem" },
                    }}
                  >
                    Langkah awal menuju transformasai diri yang menabjubkan.
                    Jadilah versi terbaikmu!
                  </Typography>
                  <Button
                    variant="contained"
                    href="/services"
                    sx={{
                      marginTop: { xs: "0.8rem", sm: "1.25rem", md: "2.5rem" },
                      color: theme.palette.secondary.main,
                      fontSize: { xs: "0.7rem", sm: "0.8rem", md: "1rem" },
                      borderRadius: 0,
                    }}
                  >
                    Booking Sekarang
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* kisi kisi katalog produk swiper */}
      <Box sx={{ padding: "50px", backgroundColor: "white" }}>
        <Box
          marginBottom="2rem"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h2"
            color="primary.main"
            sx={{ fontWeight: "bold" }}
          >
            Pilihan Produk
          </Typography>
          <Link to={`/products`}>
            <Typography
              variant="h3"
              color="primary.main"
              marginTop="auto"
              marginBottom="auto"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Lihat lebih
            </Typography>
          </Link>
        </Box>

        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          navigation
          modules={[Navigation]}
          breakpoints={{
            0: {
              // Breakpoint untuk layar xs (0px ke atas)
              slidesPerView: 2,
            },
            600: {
              // sm (600px ke atas)
              slidesPerView: 4,
            },
            900: {
              // md (900px ke atas)
              slidesPerView: 5,
            },
          }}
        >
          {catalogs.map((catalog, index) => (
            <SwiperSlide key={index}>
              <Link to={`/products/${catalog.id}`}>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    // width: { xs: 200, sm: 220, md: 350 },
                    widht: 350,
                    // height: { xs: 300, sm: 400, md: 500 },
                    height: 500,
                    backgroundColor: "#fff8f",
                    cursor: "pointer",
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                    transform: "translateY(-2px)",
                  }}
                >
                  <Grid
                    component="img"
                    src={catalog.image}
                    alt={catalog.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box marginLeft="0.5rem">
                    <Grid
                      width="100%"
                      marginBottom="0.5rem"
                      marginTop="0.25rem"
                    >
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{ letterSpacing: "0.18px" }}
                      >
                        {catalog.name}
                      </Typography>
                    </Grid>
                    <Grid width="100%" marginBottom="0.5rem">
                      <Typography variant="h5">{catalog.deskripsi}</Typography>
                    </Grid>
                    <Grid width="100%" marginBottom="0.5rem">
                      <Typography variant="h5" fontWeight="bold">
                        RP.{catalog.price}
                      </Typography>
                    </Grid>
                  </Box>
                </Grid>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
