import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { actionButtons, centerMenus } from "./constant";
import PtJobButton from "../ui-component/PtJobButton";
import CommonModal from "../ui-component/CommonModal";
import { logout } from "../../pages/login/service/authReducer";

function Navigation() {
  const [open, setOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const visibleActions = user
    ? actionButtons.filter((button) => button.label === "Post a Job")
    : actionButtons;

  function openLogoutDialog() {
    setLogoutDialogOpen(true);
  }

  function closeLogoutDialog() {
    setLogoutDialogOpen(false);
  }

  function confirmLogout() {
    dispatch(logout());
    setLogoutDialogOpen(false);
    setOpen(false);
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          color: "#444",
          borderBottom: "1px solid #eee",
          top: 0,
          zIndex: 1100,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 8 } }}>

          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              fontWeight: 800,
              fontSize: "2rem",
              color: "#2d4fff",
            }}
          >
            PT<span style={{ color: "#ff6236" }}>JOB</span>
          </Typography>

          {/* Center Menus */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              mx: "auto",
            }}
          >
            {centerMenus.map((menu) => (
              <Button
                key={menu.label}
                component={Link}
                to={menu.path}
                sx={{
                  color: "#5f6273",
                  fontSize: "1rem",
                  textTransform: "none",
                  fontWeight: 500,
                }}
              >
                {menu.label}
              </Button>
            ))}
          </Box>

          {/* Right Side */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1.5,
              alignItems: "center",
            }}
          >
            {user && <Typography className="nav-user">Hi, {user.fullName}</Typography>}
            <PtJobButton
              buttons={visibleActions.map((btn) => ({
                id: btn.label,
                actionName: btn.label,
                variant: btn.variant,
                component: Link,
                to: btn.path,
                state: btn.state,
                sx:
                  btn.label === "Post a Job"
                    ? {
                        bgcolor: "#ffe9e2",
                        color: "#ff6236",
                        boxShadow: "none",
                        "&:hover": {
                          bgcolor: "#ffdcd1",
                          boxShadow: "none",
                        },
                      }
                    : {
                        borderColor: "#ddd",
                        color: "#222",
                      },
              }))}
            />
            {user && (
              <Button onClick={openLogoutDialog} className="nav-logout">
                Log out
              </Button>
            )}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ ml: "auto", display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260 }}>
          <List>
            {[...centerMenus, ...visibleActions].map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  state={item.state}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
            {user && (
              <ListItem disablePadding>
                <ListItemButton onClick={openLogoutDialog}>
                  <ListItemText primary="Log out" />
                </ListItemButton>
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>

      <CommonModal
        open={logoutDialogOpen}
        onClose={closeLogoutDialog}
        title="Log out?"
        description="Are you sure you want to log out of your PTJOB account?"
        titleId="logout-dialog-title"
        descriptionId="logout-dialog-description"
        primaryActionLabel="Log out"
        onPrimaryAction={confirmLogout}
        primaryActionClassName="nav-logout-confirm"
      />
    </>
  );
}

export default Navigation;