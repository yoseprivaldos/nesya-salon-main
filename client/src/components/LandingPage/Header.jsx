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
import { useState, useEffect } from "react";

const drawerWidth = "100%";
const navItems = ["SERVICES", "PRODUCTS"];
const settings = ["Akun Saya", "Reservasi Saya", "Log Out"];

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [profilePicture, setProfilePicture] = useState(
    currentUser?.profilePicture || null
  );

  useEffect(() => {
    setProfilePicture(currentUser?.profilePicture || null);
  }, [currentUser]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    document.body.style.overflowY = "scroll"; // Ensure scroll is not hidden
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    document.body.style.overflowY = "auto"; // Revert overflow style
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
            position: "fixed", // Use fixed position to keep header at top
            width: "100%", // Ensure full width
            padding: 1,
            borderBottom: `0.5px solid ${theme.palette.secondary.main}`,
            zIndex: theme.zIndex.appBar, // Ensure it's on top
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              color={theme.palette.secondary.main}
              wrap="nowrap"
            >
              {/* Icon Menu Untuk Drawer */}
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  margin={0}
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon sx={{ width: "30px", height: "30px" }} />
                </IconButton>
              </Grid>

              {/* Bagian Logo Nesya Salon */}
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

              {/* Bagian Menu Untuk Login */}
              <Grid item>
                <Box
                  sx={{
                    flexGrow: 0,
                    position: "relative",
                  }}
                  onMouseEnter={currentUser ? handleOpenUserMenu : undefined}
                  onMouseLeave={currentUser ? handleCloseUserMenu : undefined}
                >
                  <Tooltip>
                    {currentUser ? (
                      <IconButton sx={{ p: 0 }}>
                        <Avatar
                          src={profilePicture}
                          sx={{
                            objectFit: "cover",
                            width: "42px",
                            height: "42px",
                            border: 1,
                            borderColor: "secondary.main",
                            backgroundColor: "grey",
                            display: "inline-flex",
                          }}
                        />
                      </IconButton>
                    ) : (
                      <Button onClick={handleLogin}>
                        <Typography
                          color={theme.palette.secondary.main}
                          sx={{ textDecoration: "underline" }}
                        >
                          Login
                        </Typography>
                      </Button>
                    )}
                  </Tooltip>

                  <Menu
                    sx={{
                      mt: "45px",
                      position: "absolute", // Absolute positioning
                      zIndex: theme.zIndex.modal, // Ensure it's above other elements
                      right: 0, // Align to the right
                      overflow: "visible", // Ensure overflow doesn't add extra scroll
                    }}
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
                    disableScrollLock
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          {setting === "Akun Saya" ? (
                            <Link
                              to="/account"
                              onClick={() => {
                                handleCloseUserMenu();
                                setTimeout(() => {
                                  navigate("/account");
                                }, 100);
                              }}
                            >
                              {setting}
                            </Link>
                          ) : setting === "Reservasi Saya" ? (
                            <Link
                              to="/reservation"
                              onClick={() => {
                                handleCloseUserMenu();
                                setTimeout(() => {
                                  navigate("/reservation");
                                }, 100);
                              }}
                            >
                              {setting}
                            </Link>
                          ) : (
                            <Link
                              to="/login"
                              onClick={() => {
                                handleLogout();
                              }}
                            >
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
  window: PropTypes.func,
};

export default Header;
