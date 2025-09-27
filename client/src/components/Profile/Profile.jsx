import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Stack,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  Tooltip,
  Grid,
} from "@mui/material";
import {
  Edit as EditIcon,
  LockReset as LockResetIcon,
  Logout as LogoutIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import useAuth from "../Auth/useAuth";
import UserProfile from "../Marginals/UserProfile";

const AnimatedProfileCard = () => {
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
  const [editMode, setEditMode] = useState(false);

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
    setEditMode(false);
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { ...profileData }, { merge: true });
      setOriginalData(profileData);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setAgeError("");
    setEditMode(false);
  };

  const confirmPasswordReset = () => {
    if (window.confirm("Are you sure you want to reset your password?")) {
      handlePasswordReset();
    }
  };

  return (
    <Stack spacing={3} alignItems="center" p={{ xs: 3, md: 0 }}>
      <UserProfile />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Email"
              value={profileData.email}
              disabled
            />
            <TextField
              fullWidth
              label="Phone"
              value={profileData.phone}
              onChange={handleChange("phone")}
              disabled={!editMode}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <Stack spacing={2}>
            <Select
              fullWidth
              value={profileData.gender}
              onChange={handleChange("gender")}
              displayEmpty
              disabled={!editMode}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
            <TextField
              fullWidth
              label="Age"
              type="number"
              value={profileData.age}
              onChange={handleChange("age")}
              error={!!ageError}
              helperText={ageError}
              disabled={!editMode}
            />
          </Stack>
        </Grid>
        <Grid size={12}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Address"
              value={profileData.address}
              onChange={handleChange("address")}
              disabled={!editMode}
            />
            <TextField
              fullWidth
              label="About"
              multiline
              minRows={3}
              value={profileData.about}
              onChange={handleChange("about")}
              disabled={!editMode}
            />
          </Stack>
        </Grid>

        {/* Actions */}
        <Grid size={12}>
          <Stack spacing={2}>
            {editMode ? (
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  color="primary"
                  disabled={!!ageError}
                >
                  Save
                </Button>
                <Box></Box>
              </Stack>
            ) : (
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button onClick={() => setEditMode(true)} variant="outlined">
                  Edit
                </Button>
                {/* <Button onClick={confirmPasswordReset} variant="contained">
                  Reset Password
                </Button> */}
                <Button onClick={logout} color="error" variant="outlined">
                  Logout
                </Button>
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AnimatedProfileCard;
