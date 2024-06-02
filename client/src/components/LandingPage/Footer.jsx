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
    <Box
      position="relative"
      component="footer"
      sx={{ bgcolor: "black", color: "white", pt: 7, paddingBottom: 2 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Link href="/services" marginBottom="1rem">
              <Typography color="white" variant="h2" fontWeight="bold">
                Layanan
              </Typography>
            </Link>
            <Link href="/products">
              <Typography color="white" variant="h2" fontWeight="bold">
                Katalog
              </Typography>
            </Link>
            <Link href="/news">
              <Typography color="white" variant="h2" fontWeight="bold">
                Info
              </Typography>
            </Link>
            <Link href="/jobs">
              <Typography color="white" variant="h2" fontWeight="bold">
                Pekerjaan
              </Typography>
            </Link>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
              Kontak
            </Typography>
            <Typography variant="h4">
              <IconButton href="https://www.google.com/maps/place/NESYA+SALON/@3.1896567,98.509291,15z/data=!4m6!3m5!1s0x303103dccbebe145:0x926ce357f397bab8!8m2!3d3.1896567!4d98.509291!16s%2Fg%2F11fs_k1x7c?hl=id&entry=ttu">
                <Place color="secondary" />
              </IconButton>
              : Berastagi, Karo, Sumatera Utara
            </Typography>
            <Typography variant="h4">
              <IconButton>
                <ContactPhone color="secondary" />
              </IconButton>
              : 081229276602
            </Typography>
            <Typography variant="h4">
              <IconButton>
                <MailOutline color="secondary" />
              </IconButton>
              : nesyasalon@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{ fontWeight: "bold", alignItem: "auto" }}
            >
              Ikuti Kami
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignContent: "center",
              }}
            >
              <IconButton
                color="inherit"
                href="https://www.facebook.com/saloncantik"
              >
                <Facebook />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.instagram.com/nesya_beauty_salon"
              >
                <Instagram />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.twitter.com/saloncantik"
              >
                <Twitter />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://www.youtube.com/saloncantik"
              >
                <YouTube />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, fontSize: 14, opacity: 0.8 }} // Menyesuaikan margin, ukuran font, dan opacity
        >
          &copy; {new Date().getFullYear()} Nesya Salon. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
