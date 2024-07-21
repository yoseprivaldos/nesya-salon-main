/* eslint-disable no-unused-vars */
import React from "react";
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
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import BadgeIcon from "@mui/icons-material/Badge";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import PropTypes from "prop-types";
const navItems = [
  {
    text: "DASHBOARD",
    icon: <HomeOutlined />,
    path: "/dashboard",
  },

  {
    text: "JADWAL",
    icon: <CalendarMonthIcon />,
    path: "/dashboard/pelanggan",
    subItems: [{ text: "Kalender", path: "/dashboard/schedule" }],
  },
  {
    text: "RESERVASI",
    icon: <Groups2Outlined />,
    path: "/dashboard/janjitemu",
    subItems: [
      { text: "Kelola Reservasi", path: "/dashboard/reservations" },
      {
        text: "Tambah Reservasi",
        path: "/dashboard/reservations/create-reservation",
      },
    ],
  },

  {
    text: "LAYANAN",
    icon: <ReceiptLongOutlined />,
    path: "/dashboard/services",
    subItems: [
      { text: "Daftar Layanan", path: "/dashboard/services" },
      { text: "Tambah Layanan", path: "/dashboard/services/create-service" },
    ],
  },
  {
    text: "PRODUK",
    icon: <ShoppingCartOutlined />,
    path: "/dashboard/products",
    subItems: [
      { text: "Daftar Produk", path: "/dashboard/products" },
      { text: "Tambah Produk", path: "/dashboard/products/add-product" },
    ],
  },
  {
    text: "KARYAWAN",
    icon: <BadgeIcon />,
    path: "/dashboard/employees",
    subItems: [
      { text: "Daftar Staf", path: "/dashboard/employees" },
      { text: "Daftar Admin", path: "/dashboard/admin" },
    ],
  },
  {
    text: "LAPORAN",
    icon: <MoveToInboxIcon />,
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
