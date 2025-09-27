import useAuth from "./useAuth";
import { ArrowRight } from "lucide-react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const Register = ({ toggleLogin }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    fullName,
    setFullName,
    error,
    handleGoogleLogin,
    handleEmailRegister,
  } = useAuth();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: { xs: 2, sm: 4 },
        py: { xs: 5, sm: 10 },
        height:"100%",
        minHeight:"100vh"
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: 400 } }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src="/media/images/dpc-logo2.png"
            alt="brand logo"
            style={{ width: 100, height: 100 }}
          />
        </Box>

        <Typography variant="h5" fontWeight="bold" textAlign="center">
          Sign up to create account
        </Typography>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ mt: 1, mb: 3 }}
        >
          Already have an account?{" "}
          <Box
            component="span"
            onClick={toggleLogin}
            sx={{
              fontWeight: "medium",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Sign In
          </Box>
        </Typography>

        <form onSubmit={handleEmailRegister}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <TextField
              label="Email Address"
              variant="outlined"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              endIcon={<ArrowRight size={16} />}
              sx={{py:1.5}}
            >
              Create Account
            </Button>
          </Stack>
        </form>

        <Stack spacing={2} sx={{ mt: 1 }}>
          <Button
            type="button"
            onClick={() => handleGoogleLogin(true)}
            variant="outlined"
            fullWidth
            startIcon={
              <img
                src="/media/images/Google.svg"
                alt="Google icon"
                style={{ width: 24, height: 24, borderRadius: "50%" }}
              />
            }
            sx={{
              textTransform: "none",
              color: "text.primary",
              borderColor: "grey.400",
              "&:hover": { backgroundColor: "grey.100" },
              py:1.5
            }}
          >
            Sign up with Google
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default Register;
