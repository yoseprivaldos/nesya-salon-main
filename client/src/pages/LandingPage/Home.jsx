import { Button, Typography } from "@mui/material";
import ProductHeroLayout from "../../components/LandingPage/ProductHeroLayout";
import ServiceValues from "../../components/LandingPage/ServiceValues";

const backgroundImage = "url(https://source.unsplash.com/random?wallpapers)";

export default function Home() {
  return (
    <>
      <ProductHeroLayout
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "#7fc7d9", // Average color of the background image.
          backgroundPosition: "center",
        }}
      >
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Typography color="inherit" align="center" variant="h2" marked="center">
          Upgrade your Sundays
        </Typography>
        <Typography
          color="inherit"
          align="center"
          variant="h5"
          sx={{ mb: 4, mt: { xs: 4, sm: 10 } }}
        >
          Enjoy secret offers up to -70% off the best luxury hotels every
          Sunday.
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          size="large"
          component="a"
          href="/premium-themes/onepirate/sign-up/"
          sx={{ minWidth: 200 }}
        >
          Register
        </Button>
        <Typography variant="body2" color="inherit" sx={{ mt: 2 }}>
          Discover the experience
        </Typography>
      </ProductHeroLayout>

      <ServiceValues></ServiceValues>
    </>
  );
}
