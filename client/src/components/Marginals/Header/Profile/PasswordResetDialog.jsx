import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";

const PasswordResetDialog = ({ open, onClose, auth, user, email }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handlePasswordReset = async () => {
    const resetEmail = user?.email || email;
    if (!resetEmail) {
      setSnackbar({
        open: true,
        message: "Please enter your email first!",
        severity: "warning",
      });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setSnackbar({
        open: true,
        message: "Password reset email sent! Check your inbox.",
        severity: "success",
      });
      onClose();
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.message || "Oops! Something went wrong!",
        severity: "error",
      });
    }
  };

  return (
    <>
      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset your password? We’ll send a reset
            link to your registered email.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="error" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handlePasswordReset}
            color="primary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PasswordResetDialog;
