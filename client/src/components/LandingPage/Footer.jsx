import {
  Box,
  Typography,
  Grid,
  IconButton,
  Container,
  Link,
} from "@mui/material";
import {
  ContactPhone,
  Facebook,
  Instagram,
  MailOutline,
  Place,
  Twitter,
  YouTube,
} from "@mui/icons-material";

function Footer() {
  return (
    <>
      <Box
        position="relative"
        component="footer"
        sx={{ bgcolor: "black", color: "white", pt: 5, pb: 3 }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={5} justifyContent="center">
            <Grid item xs={12} sm={3}>
              <Typography
                color="secondary"
                variant="h3"
                gutterBottom
                fontWeight="bold"
              >
                TENTANG KAMI
              </Typography>
              <Typography mt={1} mb={1}>
                Seiring dengan gaya hidup yang modern kami hadir untuk
                memberikan kemudahan layanan kecantikan di Berastagi dan
                sekitarnya. Dengan beragamnya staff dan layanan yang disediakan,
                kami percaya dapat mempermudah kamu mendapatkan perawatan
                terbaik.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} justifyContent="space-between" gap={3}>
              <Typography
                color="secondary"
                variant="h3"
                gutterBottom
                fontWeight="bold"
              >
                FITUR KAMI
              </Typography>
              <Link href="/services" marginBottom="1rem">
                <Typography color="white" variant="h4" fontWeight="bold">
                  Layanan
                </Typography>
              </Link>
              <Link href="/products">
                <Typography color="white" variant="h4" fontWeight="bold">
                  Katalog
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography
                color="secondary"
                variant="h3"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                KONTAK KAMI
              </Typography>
              <Typography variant="h5">
                <IconButton href="https://www.google.com/maps/place/NESYA+SALON/@3.1896567,98.509291,15z/data=!4m6!3m5!1s0x303103dccbebe145:0x926ce357f397bab8!8m2!3d3.1896567!4d98.509291!16s%2Fg%2F11fs_k1x7c?hl=id&entry=ttu">
                  <Place color="secondary" />
                </IconButton>
                : Berastagi, Karo, Sumatera Utara
              </Typography>
              <Typography variant="h5">
                <IconButton>
                  <ContactPhone color="secondary" />
                </IconButton>
                : 082315627887
              </Typography>
              <Typography variant="h5">
                <IconButton>
                  <MailOutline color="secondary" />
                </IconButton>
                : nesyasalon@gmail.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography
                align="center"
                color="secondary"
                variant="h3"
                gutterBottom
                sx={{ fontWeight: "bold", alignItem: "auto" }}
              >
                IKUTI KAMI
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <IconButton
                  size="large"
                  color="secondary"
                  href="https://www.instagram.com/nesya_beauty_salon"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  color="secondary"
                  href="https://www.instagram.com/nesya_beauty_salon"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  color="secondary"
                  href="https://www.instagram.com/nesya_beauty_salon"
                >
                  <Twitter />
                </IconButton>
                <IconButton
                  color="secondary"
                  href="https://www.instagram.com/nesya_beauty_salon"
                >
                  <YouTube />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ backgroundColor: "black", color: "white", pb: "1rem" }}>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, fontSize: 14, opacity: 0.8 }} // Menyesuaikan margin, ukuran font, dan opacity
        >
          &copy; {new Date().getFullYear()} Nesya Salon. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

export default Footer;
