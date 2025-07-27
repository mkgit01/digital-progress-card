import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar2 from "./Sidebar2";
import "../../styles/toggleMode.css";
import {
  Avatar,
  Paper,
  Typography,
  Box,
  IconButton,
  ClickAwayListener,
  Popper,
  MenuList,
  MenuItem,
  Stack,
} from "@mui/material";
import useAuth from "../Auth/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = ({ user }) => {
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("User");
  const anchorRef = useRef(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  useEffect(() => {
    if (user?.displayName) {
      setFullName(user.displayName);
    }
  }, [user]);

  const greetingName = fullName.split(" ")[0] || "User";
  const truncatedName =
    fullName.length > 16 ? fullName.slice(0, 16) + "…" : fullName;

  const handleProfileClick = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const handleProfileNavigate = () => {
    navigate("/profile");
    handleCloseMenu();
  };

  const handleLogout = () => {
    logout();
    handleCloseMenu();
  };

  return (
    <>
      <Sidebar2 user={user} />

      <div className="header flex items-center justify-between h-16 px-4 mb-1 top-0">
        <div className="logo-holder m-auto">
          <Link to="/">
            <img
              className="logo-img object-cover"
              src="/media/images/dpc-logo.png"
              alt="logo"
            />
          </Link>
        </div>

        {/* Toggle theme switch (hidden in UI) */}
        <div className="relative align-middle select-none transition duration-200 ease-in hidden">
          <input
            type="checkbox"
            id="toggle"
            className="toggle-checkbox absolute block rounded-full appearance-none cursor-pointer"
            checked={mode === "dark"}
            onChange={toggleMode}
          />
          <label
            htmlFor="toggle"
            className="toggle-label block overflow-hidden rounded-full cursor-pointer"
          ></label>
        </div>

        {/* Profile & greeting section */}
        <Box
          className="flex items-center gap-2"
          sx={{ position: "absolute", right: 16 }}
        >
          <Typography variant="body1" color="#fff">
            Hi, {greetingName}
          </Typography>
          <IconButton ref={anchorRef} onClick={handleProfileClick}>
            <Avatar
              alt="Profile"
              src={user?.photoURL || "/media/images/user-profile.png"}
              sx={{ width: 36, height: 36, border: "2px solid #fff" }}
            />
          </IconButton>

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement="bottom-end"
            disablePortal={false}
            style={{ zIndex: 1300 }}
          >
            <ClickAwayListener onClickAway={handleCloseMenu}>
              <Paper sx={{ mt: 1, minWidth: 160 }}>
                <MenuList
                  autoFocusItem={open}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") handleCloseMenu();
                  }}
                  sx={{ p: 1, border: "1px solid black", borderRadius: 1 }}
                >
                  <Stack
                    padding={1}
                    direction="row"
                    alignItems="center"
                    justifyContent={"center"}
                    color={"#fff"}
                    bgcolor={"primary.main"}
                  >
                    <Typography variant="subtitle2">{truncatedName}</Typography>
                  </Stack>
                  <MenuItem onClick={handleProfileNavigate} sx={{ mt: 1 }}>
                    <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
                    Profile
                  </MenuItem>

                  <MenuItem onClick={handleLogout} sx={{ mt: 1 }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </MenuList>
              </Paper>
            </ClickAwayListener>
          </Popper>
        </Box>
      </div>
    </>
  );
};

export default Header;
