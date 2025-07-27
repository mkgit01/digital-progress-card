import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Logout as LogoutIcon,
  LockReset as LockResetIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import useAuth from "../Auth/useAuth";
import UserProfile from "../Marginals/UserProfile";

const Profile = () => {
  const { user, handlePasswordReset, logout } = useAuth();

  const [profileData, setProfileData] = useState({
    address: "N/A",
    gender: "N/A",
    age: "N/A",
    about: "N/A",
    email: "N/A",
    phone: "N/A",
  });

  const [originalData, setOriginalData] = useState({});
  const [ageError, setAgeError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const data = userDoc.data();
          setOriginalData(data);
          setProfileData({
            address: data.address || "Not provided",
            gender: data.gender || "Not provided",
            age: data.age || "Not provided",
            about: data.about || "Not provided",
            email: data.email || "Not provided",
            phone: data.phone || "Not provided",
          });
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setProfileData(originalData);
    setAgeError("");
    setOpenDialog(false);
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    if (field === "age") {
      const ageNumber = Number(value);
      if (value === "") {
        setProfileData({ ...profileData, age: "" });
        setAgeError("");
        return;
      }
      if (ageNumber >= 1 && ageNumber <= 180) {
        setAgeError("");
      } else {
        setAgeError("Age must be between 1 and 180");
      }
    }
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSave = async () => {
    if (ageError) return;
    setOpenDialog(false);
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        ...profileData,
      }, { merge: true });
      setOriginalData(profileData);
    }
  };

  const confirmPasswordReset = () => {
    if (window.confirm("Are you sure you want to reset your password?")) {
      handlePasswordReset();
    }
  };

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Card sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Stack spacing={2} alignItems="center">
          <UserProfile />

          <Typography variant="body1"><strong>Email:</strong> {profileData.email}</Typography>
          <Typography variant="body1"><strong>Phone:</strong> {profileData.phone}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {profileData.address}</Typography>
          <Typography variant="body1"><strong>Gender:</strong> {profileData.gender}</Typography>
          <Typography variant="body1"><strong>Age:</strong> {profileData.age}</Typography>
          <Typography variant="body1"><strong>About:</strong> {profileData.about}</Typography>

          <Stack direction="row" spacing={2}>
            <Tooltip title="Edit">
              <IconButton onClick={handleOpenDialog} color="info">
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Reset Password">
              <IconButton onClick={confirmPasswordReset} color="secondary">
                <LockResetIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Log Out">
              <IconButton onClick={logout} color="error">
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>

        {/* Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Stack spacing={2} mt={1}>
              <TextField
                label="Phone"
                value={profileData.phone}
                onChange={handleChange("phone")}
              />
              <TextField
                label="Address"
                value={profileData.address}
                onChange={handleChange("address")}
              />
              <Select
                value={profileData.gender}
                onChange={handleChange("gender")}
                displayEmpty
              >
                <MenuItem value="">Select Gender</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <TextField
                label="Age"
                type="number"
                value={profileData.age}
                onChange={handleChange("age")}
                error={!!ageError}
                helperText={ageError}
              />
              <TextField
                label="About"
                multiline
                minRows={3}
                value={profileData.about}
                onChange={handleChange("about")}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
            variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCloseDialog}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              startIcon={<SaveIcon />}
              onClick={handleSave}
              variant="contained"
              color="primary"
              disabled={!!ageError}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
};

export default Profile;
