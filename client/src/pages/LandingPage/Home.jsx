// import ToolsSection from "../../components/LandingPage/ToolsSection";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
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

const tools = [
  {
    nameTools: "Services",
    image: tools1,
    path: "/services",
  },
  {
    nameTools: "Salons",
    image: tools2,
    path: "/salons",
  },
  {
    nameTools: "Catalogs",
    image: tools3,
    path: "/products",
  },
  {
    nameTools: "Educations",
    image: tools4,
    path: "educations",
  },
  {
    nameTools: "Jobs",
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
          spaceBetween={20}
          slidesPerView={4}
          navigation
          modules={[Navigation]}
          style={{ padding: "20px 0" }}
        >
          {tools.map((tool, index) => (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  margin: "0 5px",
                  "&:hover img": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Box
                  component="img"
                  src={tool.image}
                  alt={tool.nameTools}
                  onClick={() => handleImageClick(tool.path)}
                  sx={{
                    width: "90%",
                    height: "300px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease-in-out",

                    cursor: "pointer",
                  }}
                ></Box>
                <Typography // Text overlay positioned over the image
                  variant="h4"
                  sx={{
                    width: "85px",
                    position: "absolute", // Position the text
                    backgroundColor: theme.palette.primary.main,
                    textAlign: "center",
                    color: theme.palette.secondary.main,
                    opacity: 1, // Initially hidden
                    padding: 2,
                    margin: "90%",
                    transition: "opacity 0.3s ease-in-out", // Smooth transition
                  }}
                >
                  {tool.nameTools}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* tagline 1 */}
      <Box sx={{ backgroundColor: theme.palette.secondary.main, padding: 0 }}>
        <Grid container spacing={2} alignContent="center">
          <Grid item sm={5} xs={12}>
            {/* Gambar */}
            <Box
              component="img"
              src={tools1}
              sx={{
                width: "100%",
                height: "700px",
                objectFit: "cover",
              }}
            ></Box>
          </Grid>
          <Grid item sm={7} xs={12}>
            <Box
              backgroundColor={theme.palette.secondary.main}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Box width="550px" className="main-tittle" sx={{ mx: "auto" }}>
                <Typography variant="h1" fontWeight="bold">
                  Waktu Berharga,
                </Typography>
                <Typography variant="h1">
                  Booking Salon Lebih Cepat dan Mudah.
                </Typography>
              </Box>
              <Box width="550px" className="second-tittle" sx={{ mx: "auto" }}>
                <Typography variant="h3">
                  Langkah Awal Menuju Transformasai Diri yang Menabjubkan.
                  Jadilah Versi Terbaikmu!
                </Typography>
                <Button
                  variant="contained"
                  href="/services"
                  sx={{
                    marginTop: "2.5rem",
                    color: theme.palette.secondary.main,
                  }}
                >
                  Booking Sekarang
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* kisi kisi katalog produk swiper */}
      <Box
        sx={{ padding: "50px", backgroundColor: theme.palette.background.alt }}
      >
        <Box
          marginBottom="2rem"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h2" color="#FFFFFF">
            Pilihan Produk
          </Typography>
          <Link to={`/products`}>
            <Typography
              variant="h3"
              color="#FFFFFF"
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
        >
          {catalogs.map((catalog, index) => (
            <SwiperSlide key={index}>
              <Link to={`/products/${catalog.id}`}>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "275px",
                    height: "500px",
                    backgroundColor: theme.palette.secondary.main,
                    cursor: "pointer",
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
