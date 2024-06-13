import {
  Box,
  Paper,
  Button,
  TextField,
  Chip,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { useGetServicesQuery } from "../../redux/api/api";

const Trial = () => {
  const [openServiceDialog, setOpenServiceDialog] = useState(false);
  const [selectedServiceNames, setSelectedServiceNames] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [search, setSearch] = useState("");
  const { data } = useGetServicesQuery();

  const [totalPrice, setTotalPrice] = useState(0);

  const services = useMemo(
    () =>
      data?.map((service) => ({
        _id: service._id,
        name: service.name,
        duration: service.duration,
        price: service.price,
      })) || [],
    [data]
  );

  const handleOpenServiceDialog = () => {
    setOpenServiceDialog(true);
  };
  const handleCloseServiceDialog = () => {
    setOpenServiceDialog(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedServiceIds((prevIds) =>
      prevIds.includes(service._id)
        ? prevIds.filter((id) => id !== service._id)
        : [...prevIds, service._id]
    );
    setSelectedServiceNames((prevNames) =>
      prevNames.includes(service.name)
        ? prevNames.filter((name) => name !== service.name)
        : [...prevNames, service.name]
    );
  };

  const handleDeleteService = (serviceId, serviceName) => {
    setSelectedServiceIds((prevIds) =>
      prevIds.filter((id) => id !== serviceId)
    );
    setSelectedServiceNames((prevNames) =>
      prevNames.filter((name) => name !== serviceName)
    );
  };

  useEffect(() => {
    const total = selectedServiceIds.reduce((acc, id) => {
      const service = services.find((service) => service._id === id);
      return acc + (service ? service.price : 0);
    }, 0);
    setTotalPrice(total);
  }, [selectedServiceIds, services]);

  return (
    <Box>
      {/* pilih layanan */}
      <Paper elevation={3} sx={{ p: 3, bgcolor: "background.alt" }}>
        <Button
          variant="outlined"
          sx={{
            bgcolor: "primary.main",
            color: "secondary.main",
            borderRadius: 0,
          }}
          onClick={handleOpenServiceDialog}
        >
          Pilih Layanan
        </Button>
        <Box mt={2}>
          {selectedServiceNames.map((serviceName, index) => (
            <Chip
              key={index}
              label={serviceName}
              onDelete={() =>
                handleDeleteService(selectedServiceIds[index], serviceName)
              }
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>
        {/* Field Untuk total harga */}
        <Box mt={3}>
          <TextField
            label="Total Harga"
            variant="outlined"
            fullWidth
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            InputProps={{
              readOnly: true,
            }}
            sx={{ mt: 2 }}
          />
        </Box>
      </Paper>

      {/* Modal Untuk memilih layanan */}
      <Dialog
        open={openServiceDialog}
        onClose={handleCloseServiceDialog}
        fullWidth
        maxWidth="sm"
      >
        <Box sx={{ bgcolor: "background.alt", color: "secondary.main" }}>
          <DialogTitle>Pilih Layanan</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="serviceSearch"
              label="Cari Layanan Lain"
              type="text"
              fullWidth
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => setSearch("")}>Clear</Button>
                  </InputAdornment>
                ),
              }}
            />
            <div
              style={{
                maxHeight: "300px",
                overflow: "auto",
                marginTop: "16px",
              }}
            >
              {services
                .filter((service) =>
                  service.name.toLowerCase().includes(search.toLowerCase())
                )
                .slice(0, 6) //menampilkan hanya 5 layanan utama secara default
                .map((service) => (
                  <Button
                    key={service._id}
                    onClick={() => handleServiceSelect(service)}
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                      borderRadius: 0,
                      bgcolor: selectedServiceIds.includes(service._id)
                        ? "secondary.main"
                        : "primary.main",

                      color: "background.alt",
                      "&:hover": {
                        bgcolor: "secondary.main",
                      },
                    }}
                  >
                    {service.name}
                  </Button>
                ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseServiceDialog}
              variant="contained"
              sx={{ borderradius: 0 }}
            >
              Keluar
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default Trial;
