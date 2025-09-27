import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import "../../../styles/toggleMode.css";
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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import useAuth from "../../Auth/useAuth";
import { ProfileButton } from "./Profile";

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
      <Sidebar user={user} />

      <div
        className="header flex items-center justify-between h-16 px-4 mb-1 top-0"
        style={{
          background:
            "linear-gradient(to right, black 25%, white 50%, black 75%)",
        }}
      >
        <div className="logo-holder m-auto">
          <Link to="/">
            <img
              className="logo-img object-cover"
              src="/media/images/dpc-logo2.png"
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

          <ProfileButton />
        </Box>
      </div>
    </>
  );
};

export default Header;
