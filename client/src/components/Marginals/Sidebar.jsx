import React, { useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Stack,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { BarChart, Wallet, Medal, Wrench, LogOut, Headset } from "lucide-react";
import { NavLink } from "react-router-dom";
import UserProfile from "./UserProfile";
import useAuth from "../Auth/useAuth";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import LogoutDialog from "./Header/Profile/LogoutDialog";

const Sidebar = ({ user }) => {
  const { logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const NavItem = ({ to, icon, label, onClick = toggleSidebar }) => (
    <ListItem disablePadding>
      <ListItemButton
        component={NavLink}
        to={to}
        onClick={onClick}
        sx={{ px: 2 }}
      >
        <ListItemIcon sx={{ minWidth: 36 }}>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );

  return (
    <>
      {/* Menu Toggle Button */}
      <IconButton
        onClick={toggleSidebar}
        sx={{ position: "absolute", top: 10, left: 10, color: "invert.main" }}
      >
        <TbLayoutSidebarRightCollapse size={30} />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={sidebarOpen}
        onClose={toggleSidebar}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {/* Sidebar Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pl={1}
          py={1}
          borderBottom="1px solid #ddd"
        >
          <Typography variant="h6">DPC</Typography>
          <IconButton onClick={toggleSidebar}>
            <TbLayoutSidebarLeftCollapse size={30} />
          </IconButton>
        </Box>
        <Stack alignItems={"center"}>
          {/* User Profile */}
          <Box px={2} py={1}>
            <UserProfile toggleSidebar={toggleSidebar} user={user} />
          </Box>
        </Stack>
        <Stack minWidth={"250px"}>
          {/* Navigation Links */}
          <List>
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                px: 2,
                color: "text.secondary",
              }}
            >
              Analytics
            </Typography>
            <NavItem to="/" icon={<BarChart size={20} />} label="Dashboard" />
            <NavItem to="/task" icon={<Wallet size={20} />} label="Task" />
            <NavItem to="/rewards" icon={<Medal size={20} />} label="Rewards" />
            {/* <NavItem
            to="/settings/account"
            icon={<Wrench size={20} />}
            label="Settings"
          /> */}
          </List>

          <Divider sx={{ my: 1 }} />

          <List>
            <Typography
              variant="caption"
              sx={{
                textTransform: "uppercase",
                px: 2,
                color: "text.secondary",
              }}
            >
              Support
            </Typography>
            <NavItem
              to="/contact-us"
              icon={<Headset size={20} />}
              label="Contact Us"
            />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpenLogoutDialog(true);
                }}
                sx={{ px: 2 }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <LogOut size={20} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Drawer>

      <LogoutDialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        onConfirm={() => {
          logout();
          setOpenLogoutDialog(false);
        }}
      />
    </>
  );
};

export default Sidebar;
