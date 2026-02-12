import React, { useState } from "react";
import useAuth from "./useAuth";
import Register from "./Register";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { ArrowRight } from "lucide-react";

const Login = ({ setLogin }) => {
  const [isRegistered, setIsRegistered] = useState(true);
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleGoogleLogin,
    handleEmailLogin,
    handlePasswordReset,
  } = useAuth();

  const toggleLogin = () => setIsRegistered((prev) => !prev);

  return (
    <>
      {isRegistered ? (
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
                height={100}
                width={100}
                
                src="/media/images/dpc-logo2.png"
                alt="brand logo"
              />
            </Box>
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Sign in to your account
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              sx={{ mt: 1, mb: 3 }}
            >
              Don&apos;t have an account?{" "}
              <Box
                component="span"
                onClick={toggleLogin}
                sx={{
                  cursor: "pointer",
                  fontWeight: "bold",
                  textDecoration: "underline",
                }}
              >
                Create a free account
              </Box>
            </Typography>

            <form onSubmit={handleEmailLogin}>
              <Stack spacing={1}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                  <Stack direction="row-reverse">
                    <Button
                      variant="text"
                      onClick={handlePasswordReset}
                      sx={{ textTransform: "none", fontSize: 14 }}
                    >
                      Forgot password?
                    </Button>
                  </Stack>
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
                  sx={{ py: 1.5 }}
                >
                  Get started
                </Button>
              </Stack>
            </form>

            <Stack spacing={2} sx={{ mt: 1 }}>
              <Button
                onClick={handleGoogleLogin}
                variant="outlined"
                fullWidth
                size="medium"
                startIcon={
                  <img
                    src="/media/images/Google.svg"
                    alt="Google"
                    style={{ width: 24, height: 24, borderRadius: "50%" }}
                  />
                }
                sx={{
                  textTransform: "none",
                  color: "text.primary",
                  borderColor: "grey.400",
                  "&:hover": {
                    backgroundColor: "grey.100",
                  },
                  py:1.5
                }}
              >
                Sign in with Google
              </Button>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Register toggleLogin={toggleLogin} setLogin={setLogin} />
      )}
    </>
  );
};

export default Login;
