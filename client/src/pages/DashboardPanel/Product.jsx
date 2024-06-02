import { Box } from "@mui/material";
import Header from "../../components/dashboard/Header";
Header;
const Product = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Produk" subtitle="Daftar Produk" />
      <Box mt="40px" height="75vh"></Box>
    </Box>
  );
};
export default Product;
