/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/api/api";
import SwiperCore from "swiper";
import { useEffect, useState } from "react";
import { Collections, ContentCut, PinDrop, Sell } from "@mui/icons-material";
import tools1 from "../../assets/tools/services.jpeg";
import tools2 from "../../assets/tools/produkTool.jpg";
import tools3 from "../../assets/tools/Galeri.png";
import tools4 from "../../assets/tools/map.png";
import tools5 from "../../assets/tools/serviceTool.jpeg";

// Initialize Swiper core components
SwiperCore.use([Navigation]);

const tools = [
  {
    nameTools: "Layanan",
    image: tools5,
    icon: ContentCut,
    path: "/services",
  },
  {
    nameTools: "KATALOG",
    image: tools2,
    icon: Sell,
    path: "/products",
  },
  {
    nameTools: "SALON",
    image: tools4,
    icon: PinDrop,
    path: "https://www.google.com/maps/place/NESYA+SALON/@3.1896567,98.509291,15z/data=!4m6!3m5!1s0x303103dccbebe145:0x926ce357f397bab8!8m2!3d3.1896567!4d98.509291!16s%2Fg%2F11fs_k1x7c?hl=id&entry=ttu",
  },
  {
    nameTools: "GALERI",
    image: tools3,
    icon: Collections,
    path: "https://www.instagram.com/nesya_beauty_salon/",
  },
];

export default function Home() {
  const { data: dataProduct } = useGetProductsQuery();
  const [bestProduct, setBestProduct] = useState([]);
  const theme = useTheme();
  const handleImageClick = (path) => {
    window.location.href = path;
  };

  useEffect(() => {
    if (dataProduct && dataProduct.length > 0) {
      setBestProduct(dataProduct.slice(0, 6));
    }
  }, [dataProduct]);

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
            0: { slidesPerView: 3 },
            600: { slidesPerView: 4 },
            900: { slidesPerView: 4 },
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
                  overflow: "hidden",
                  position: "relative",
                  "&:hover .icon": { opacity: 0 },
                  "&:hover .blurred-bg": {
                    filter: "blur(0)",
                    transform: "scale(1.05)",
                  },
                  "&:hover .clear-bg": { opacity: 1, transform: "scale(1.05)" },
                  transition: "transform 0.3s ease-in-out",
                  cursor: "pointer",
                }}
              >
                <Box
                  className="blurred-bg"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "70%",
                    background: `url(${tool.image}) no-repeat center center/cover`,
                    filter: "blur(5px)",
                    transition: "all 0.3s ease-in-out",
                    zIndex: 1,
                  }}
                />
                <Box
                  className="clear-bg"
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "70%",
                    background: `url(${tool.image}) no-repeat center center/cover`,
                    opacity: 0,
                    transition: "all 0.3s ease-in-out",
                    zIndex: 2,
                  }}
                />
                <Box
                  className="icon"
                  sx={{
                    position: "relative",
                    zIndex: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "70%",
                  }}
                >
                  <tool.icon
                    style={{
                      fontSize: "80px",
                      color: theme.palette.background.alt,
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
                      fontSize: { xs: "1rem", sm: "1rem", md: "2rem" },
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

      {/* Tagline 1 */}
      <Box sx={{ backgroundColor: "#FFFFF0", padding: 0 }}>
        <Grid container spacing={0} alignContent="center">
          <Grid item sm={5} xs={12}>
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
            <Box backgroundColor="#FFFFF0" sx={{ height: "100%" }}>
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
                      fontFamily: "revert",
                    }}
                  >
                    Waktu Berharga,
                  </Typography>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: { xs: "1.5rem", sm: "1.25rem", md: "3rem" },
                      fontFamily: "monospace",
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
                      fontFamily: "revert",
                    }}
                  >
                    Kami berusaha menyesuaikan layanan dengan kebutuhan
                    masyarakat Berastagi dan Sekitarnya.
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
                    Buat Pesanan
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Katalog produk swiper */}
      <Box
        sx={{ padding: "25px", marginBottom: "50px", backgroundColor: "white" }}
      >
        <Box
          marginBottom="3rem"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "25px",
            mb: "15px",
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h2"
            color="primary.main"
            sx={{ fontWeight: "bold" }}
          >
            PILIHAN PRODUK
          </Typography>
          <Button
            component={Link}
            to="/products"
            sx={{
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 0,
            }}
          >
            Lihat Semua
          </Button>
        </Box>

        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          navigation
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            600: {
              slidesPerView: 4,
            },
            900: {
              slidesPerView: 5,
            },
          }}
        >
          {bestProduct.map((product, index) => (
            <SwiperSlide key={index}>
              <Link to={`/product/${product._id}`}>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    widht: 350,
                    height: { xs: 450, sm: 450, md: 500 },
                    backgroundColor: "#ffffff",
                    cursor: "pointer",
                    boxShadow: "-3px 0px 10px rgba(0, 0, 0, 0.2)",
                    transform: "translateY(-2px)",
                  }}
                >
                  <Grid
                    component="img"
                    src={product.imageProduct[0]}
                    alt={product.name}
                    sx={{
                      width: "100%",
                      height: "70%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      height: "30%",
                      widht: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      margin: "0.3rem 0.3rem 0.3rem 0.2rem",
                    }}
                  >
                    <Box marginBottom="0.4rem" marginTop="0.15rem">
                      <Typography
                        variant="h4"
                        fontWeight="bold"
                        sx={{ letterSpacing: "0.18px" }}
                      >
                        {product.name}
                      </Typography>
                    </Box>
                    <Box marginBottom="0.4rem">
                      <Typography variant="h5">
                        {product.description.length > 50
                          ? window.innerWidth < 600
                            ? `${product.description.substring(0, 40)}...`
                            : `${product.description.substring(0, 80)}...`
                          : product.description}
                      </Typography>
                    </Box>
                    <Box marginBottom="0.4rem">
                      <Typography variant="h4" fontWeight="bold">
                        Mulai Rp.{product.price}
                      </Typography>
                    </Box>
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
