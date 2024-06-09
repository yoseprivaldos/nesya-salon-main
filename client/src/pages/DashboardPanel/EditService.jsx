import { Box, Button, Grid } from "@mui/material";
import Header from "../../components/dashboard/Header";

const EditService = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Halaman Edit Layanan" subtitle="Ubah informasi layanan" />
      {/* Button confirmation */}

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mt: 3,
              backgroundColor: "secondary.main",
              color: "primary.main",
              borderRadius: 0,
              fontWeight: "bold",
            }}
            // onClick={handleSubmit}
          >
            {/* {isLoading ? "Memproses..." : "TEKAN UNTUK MENAMBAHKAN"} */}
            SIMPAN PERUBAHAN
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditService;
