import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Managemen Janji Temu",
    icon: null,
  },
  {
    text: "Daftar Janji Temu",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Buat Janji Temu",
    icon: <Groups2Outlined />,
  },
  {
    text: "Kalender Janji Temu",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Status Janji Temu",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Manajemen Layanan",
    icon: null,
  },

  {
    text: "Daftar Layanan",
    icon: <TodayOutlined />,
  },
  {
    text: "Tambah Layanan Baru",
    icon: <PieChartOutlined />,
  },
  {
    text: "Manajemen Produk",
    icon: null,
  },
  {
    text: "Daftar Produk",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Manajemen Staf",
    icon: null,
  },
  {
    text: "Lihat Staf",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Laporan",
    icon: null,
  },
  {
    text: "laporan layanan",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "laporan staf",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "laporan review",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Pengaturan",
    icon: null,
  },
  {
    text: "Profil Salon",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Pengaturan Umum",
    icon: <TrendingUpOutlined />,
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

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

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
            <Box m="1.5rem 2rem 1.5rem 4rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    NovaSalon
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
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "1rem 0 1rem 1rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
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
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
