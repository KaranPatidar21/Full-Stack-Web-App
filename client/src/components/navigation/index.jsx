import { useState } from "react";
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

function Navigation() {
  const [open, setOpen] = useState(false);
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
            <PtJobButton
              buttons={actionButtons.map((btn) => ({
                id: btn.label,
                actionName: btn.label,
                variant: btn.variant,
                component: Link,
                to: btn.path,
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
            {[...centerMenus, ...actionButtons].map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navigation;