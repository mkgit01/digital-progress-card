import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Popover,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import useAuth from "../../../Auth/useAuth";
import { auth, db } from "../../../../../firebaseConfig";
import PasswordResetDialog from "./PasswordResetDialog";
import LogoutDialog from "./LogoutDialog";

const ProfilePopover = ({
  anchorEl,
  onClose,
  open = false,
  name,
  email,
  phone,
}) => {
  const { user, handlePasswordReset, logout } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [profileData, setProfileData] = useState({
    phone: phone || "",
    address: "",
    gender: "",
    age: "",
    about: "",
  });
  const [originalData, setOriginalData] = useState(profileData);
  const [ageError, setAgeError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  // Fetch user data when dialog opens
  useEffect(() => {
    const fetchUser = async () => {
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setProfileData({
            phone: data.phone || "",
            address: data.address || "",
            gender: data.gender || "",
            age: data.age || "",
            about: data.about || "",
          });
          setOriginalData(data);
        }
      }
    };
    if (openDialog) fetchUser();
  }, [openDialog, user]);

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "age") {
      const ageNumber = Number(value);
      if (value === "") {
        setProfileData({ ...profileData, age: "" });
        setAgeError("");
        return;
      }
      if (ageNumber >= 1 && ageNumber <= 180) setAgeError("");
      else setAgeError("Age must be between 1 and 180");
    }
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSave = async () => {
    if (ageError) return;
    setOpenDialog(false);
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { ...profileData }, { merge: true });
      setOriginalData(profileData);
      setEditMode(false);
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleCancelEdit = () => {
    setProfileData(originalData);
    setEditMode(false);
    setAgeError("");
  };

  const confirmPasswordReset = () => {
    if (window.confirm("Are you sure you want to reset your password?")) {
      handlePasswordReset();
    }
  };

  return (
    <>
      <Popover
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        disableScrollLock
        onClose={onClose}
        open={open}
        slotProps={{
          paper: {
            sx: {
              minWidth: 250,
              p: 0,
              bgcolor: "background.paper",
              color: "text.primary",
            },
          },
        }}
      >
        <Stack width="100%">
          <Stack paddingX={3} paddingY={2} spacing={0.5}>
            <Typography fontWeight="bold" fontSize={18}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {phone}
            </Typography>
          </Stack>

          <Divider sx={{ borderColor: "divider" }} />

          <List dense>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ justifyContent: "center" }}
                onClick={() => setOpenDialog(true)}
              >
                View Profile
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ justifyContent: "center" }}
                onClick={() => setOpenResetDialog(true)}
              >
                Reset Password
              </ListItemButton>
            </ListItem>
          </List>

          <Divider sx={{ borderColor: "divider" }} />

          <Stack justifyContent="center" paddingX={4} paddingY={1}>
            <Button
              startIcon={<LogoutIcon />}
              onClick={() => {
                setOpenLogoutDialog(true);
                onClose();
              }}
              color="primary"
            >
              Logout
            </Button>
          </Stack>
        </Stack>
      </Popover>

      {/* Edit Profile Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>{!editMode ? "Profile" : "Edit Profile"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Phone"
              value={profileData.phone}
              onChange={handleChange("phone")}
              disabled={!editMode}
            />
            <TextField
              label="Address"
              value={profileData.address}
              onChange={handleChange("address")}
              disabled={!editMode}
            />
            <TextField
              label="Gender"
              select
              fullWidth
              name="gender"
              value={profileData.gender}
              onChange={handleChange("gender")}
              disabled={!editMode}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
            <TextField
              label="Age"
              type="number"
              value={profileData.age}
              onChange={handleChange("age")}
              error={!!ageError}
              helperText={ageError}
              disabled={!editMode}
            />
            <TextField
              label="About"
              multiline
              minRows={3}
              value={profileData.about}
              onChange={handleChange("about")}
              disabled={!editMode}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          {!editMode ? (
            <>
              <Button
                variant="outlined"
                onClick={handleCloseDialog}
                color="error"
                sx={{ textTransform: "none" }}
              >
                Close
              </Button>
              <Button
                variant="outlined"
                onClick={handleEdit}
                sx={{ textTransform: "none" }}
              >
                Edit
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                startIcon={<CancelIcon />}
                onClick={handleCancelEdit}
                color="error"
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
              <Button
                startIcon={<SaveIcon />}
                onClick={handleSave}
                variant="contained"
                color="primary"
                disabled={!!ageError}
                sx={{ textTransform: "none" }}
              >
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <PasswordResetDialog
        open={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
        user={user}
        auth={auth}
        email={email}
      />
      <LogoutDialog
        open={openLogoutDialog}
        onClose={() => setOpenLogoutDialog(false)}
        onConfirm={() => {
          logout();
          setOpenLogoutDialog(false);
          onClose(); // close popover after logout
        }}
      />
    </>
  );
};

ProfilePopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  name: PropTypes.string,
  email: PropTypes.string,
  profilePic: PropTypes.string,
  phone: PropTypes.string,
};

export default ProfilePopover;
