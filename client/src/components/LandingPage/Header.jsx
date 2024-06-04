import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "../../redux/user/userSlice";
import { Grid, useTheme } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";

const drawerWidth = "100%";
const navItems = ["SERVICES", "PRODUCTS", "NEWS"];
const settings = ["Akun Saya", "Reservasi Saya", "Log Out"];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/signout");
      handleCloseUserMenu();
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      color={theme.palette.secondary.main}
      backgroundColor={theme.palette.background.alt}
      sx={{ textAlign: "center", width: "100%" }}
    >
      <List>
        {navItems.map((item) => (
          <React.Fragment key={item}>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={`/${item.toLowerCase()}`}>
                <ListItemText primary={item} sx={{ textAlign: "center" }} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {/* Header Section */}
      <Box>
        <AppBar
          component="nav"
          sx={{
            backgroundColor: theme.palette.background.alt,
            position: "static",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            borderBottom: `0.5px solid ${theme.palette.secondary.main}`,
          }}
        >
          <Toolbar
            sx={{ justifyContent: "space-between", mb: "2.5px", mt: "2.5px" }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              color={theme.palette.secondary.main}
            >
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 1 }}
                >
                  <MenuIcon sx={{ width: "30px", height: "30px" }} />
                </IconButton>
              </Grid>
              <Grid item display="flex">
                <Link to="/">
                  <Typography
                    variant="h2"
                    component="div"
                    fontWeight="bold"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Nesya{" "}
                    <FiberManualRecord fontSize="small" sx={{ m: "2px" }} />{" "}
                    Salon
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip>
                    {currentUser ? (
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          src={currentUser.profilePicture}
                          sx={{
                            m: 1,
                            objectFit: "cover",
                            width: "30px",
                            height: "30px",
                            backgroundColor: "grey",
                          }}
                        />
                      </IconButton>
                    ) : (
                      <Button onClick={handleLogin}>
                        <Typography color={theme.palette.secondary.main}>
                          Login
                        </Typography>
                      </Button>
                    )}
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          {setting === "Akun Saya" ? (
                            <Link to="/account" onClick={handleCloseUserMenu}>
                              {setting}
                            </Link>
                          ) : setting === "Reservasi Saya" ? (
                            <Link
                              to="/reservation"
                              onClick={handleCloseUserMenu}
                            >
                              {setting}
                            </Link>
                          ) : (
                            <Link to="/login" onClick={handleLogout}>
                              {setting}
                            </Link>
                          )}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            anchor="top"
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
      </Box>
    </>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
