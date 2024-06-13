/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Menu,
  MenuItem,
  // Menu,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "../../components/dashboard/Header";
// import { AddCircleOutline } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGetServicesQuery } from "../../redux/api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const { data, isLoading } = useGetServicesQuery();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Layanan" subtitle="Daftar Layanan" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map((service) => (
            <Service key={service._id} {...service} />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

const Service = ({
  _id,
  name,
  duration,
  description,
  imageService,
  isActive,
  categories,
  price,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const imageUrl =
    imageService?.length > 0 ? imageService[0] : "/path/to/default-image.jpg";

  //state untuk menu setiap service
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditClick = () => {
    navigate(`edit-service/${_id}`);
    handleClose();
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        position: "relative",
      }}
    >
      <IconButton
        aria-label="more"
        id={`long-button-${_id}`} //ID unik untuk setiap menu
        aria-controls={open ? `long-menu-${_id}` : undefined}
        aria-expanded={open ? "ture" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id={`long-menu-${_id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          ".MuiMenu-paper": {
            maxHeight: 45 * 4.5,
            width: "10ch",
            mr: -8,
            mt: 4,
          },
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box>
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem>Aktifkan</MenuItem>
          <MenuItem>Hapus</MenuItem>
        </Box>
      </Menu>

      <CardContent>
        <Typography variant="h5" component="div" sx={{ mb: "1rem" }}>
          {name}
        </Typography>
        <Typography sx={{ mb: "1rem" }} color={theme.palette.secondary[400]}>
          Rp.{Number(price).toFixed(2)}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          Duration: {duration} menit
        </Typography>
      </CardContent>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography> Deskripsi Layanan:</Typography>
          <Typography> {description}</Typography>
        </CardContent>
        <CardContent>
          <Typography>Gambar Layanan</Typography>
          <CardMedia
            component="img"
            height="70"
            image={imageUrl}
            alt={name}
            sx={{ objectFit: "contain" }}
          />
        </CardContent>
      </Collapse>
      <CardActions sx={{ display: "flex" }}>
        <Button
          fullWidth
          variant="primary"
          size="large"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Lihat Lebih
        </Button>
      </CardActions>
    </Card>
  );
};

export default Services;
