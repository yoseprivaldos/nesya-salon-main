import {
  Box,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import PropTypes from "prop-types";
const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
    path: "/dashboard",
  },

  {
    text: "Pelanggan",
    icon: <ShoppingCartOutlined />,
    path: "/dashboard/pelanggan",
    subItems: [
      { text: "Daftar Pelanggan", path: "/dashboard/pelanggan/daftar" },
      { text: "Riwayat Layanan", path: "/dashboard/pelanggan/riwayat" },
    ],
  },
  {
    text: "Janji Temu",
    icon: <Groups2Outlined />,
    path: "/dashboard/janjitemu",
  },

  {
    text: "Layanan",
    icon: <ReceiptLongOutlined />,
    path: "/dashboard/services",
  },
  {
    text: "Produk",
    icon: <PointOfSaleOutlined />,
    path: "/dashboard/products",
    subItems: [
      { text: "Daftar Produk", path: "/dashboard/produk/daftar" },
      { text: "Stok Produk", path: "/dashboard/produk/stok" },
    ],
  },
  {
    text: "Karyawan",
    icon: <ShoppingCartOutlined />,
    path: "/dashboard/employees",
  },
  {
    text: "Laporan",
    icon: <TodayOutlined />,
    path: "/dashboard/report",
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const [openSubmenus, setOpenSubmenus] = useState({});

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleSubmenuClick = (text) => {
    setOpenSubmenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="2rem 2rem 3rem 2.5rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h2" fontWeight="bold">
                    NesyaSalon
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>

            <List>
              {navItems.map(({ text, icon, path, subItems }) => (
                <div key={text}>
                  <ListItemButton
                    onClick={() => {
                      if (subItems) {
                        handleSubmenuClick(text);
                      } else {
                        navigate(path);
                        setActive(text.toLowerCase());
                      }
                    }}
                    sx={{
                      backgroundColor:
                        active === text.toLowerCase()
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === text.toLowerCase()
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        minWidth: 0,
                        width: "2rem",
                        color:
                          active === text.toLowerCase()
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {subItems &&
                      (openSubmenus[text] ? <ExpandLess /> : <ExpandMore />)}
                    {active === text.toLowerCase() && (
                      <ChevronRightOutlined sx={{ ml: "auto" }} />
                    )}
                  </ListItemButton>

                  {/* Render sub-items jika ada */}
                  {subItems && (
                    <Collapse
                      in={openSubmenus[text]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" disablePadding>
                        {subItems.map(({ text, path }) => (
                          <ListItemButton
                            key={text}
                            sx={{
                              pl: 10,
                              backgroundColor:
                                active === text.toLowerCase()
                                  ? theme.palette.secondary[300]
                                  : "transparent",
                              color:
                                active === text.toLowerCase()
                                  ? theme.palette.primary[600]
                                  : theme.palette.secondary[100],
                            }}
                            onClick={() => {
                              navigate(path);
                              setActive(text.toLowerCase());
                            }}
                          >
                            <ListItemText primary={text} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  )}
                </div>
              ))}
            </List>

            {/* <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2rem 0 2rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/dahboard/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List> */}
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

Sidebar.propTypes = {
  isNonMobile: PropTypes.bool.isRequired,
  drawerWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired, // Bisa number atau string
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
};

export default Sidebar;
