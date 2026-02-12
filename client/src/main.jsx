import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import TaskPage from "./components/Tasks/TaskPage";
import InvalidPage from "./components/InvalidPage";
import Profile from "./components/Profile/Profile";
import Rewards from "./components/Tasks/Rewards";
import ContactPage from "./components/Contact/ContactPage";
import theme from "./utils/theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { GlobalSnackbarProvider } from "./context/GlobalSnackbarProvider";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { setupInterceptors } from "./config/axiosConfig";
import Loader from "./components/Loader/Loader";

const GlobalLoader = () => {
  const { loading, showLoader, hideLoader } = useLoading();

  useEffect(() => {
    setupInterceptors(showLoader, hideLoader);
  }, [showLoader, hideLoader]);

  if (!loading) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(255,255,255,0.9)",
        zIndex: 2000,
      }}
    >
      <Loader />
    </div>
  );
};


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Dashboard />} />
      <Route path="login" element={<Login />} />
      <Route path="task" element={<TaskPage />} />
      <Route path="rewards" element={<Rewards />} />
      <Route path="profile" element={<Profile />} />
      <Route path="contact-us" element={<ContactPage />} />
      <Route path="*" element={<InvalidPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadingProvider>
      <GlobalLoader />
      <ThemeProvider theme={theme}>
        <GlobalSnackbarProvider>
          <CssBaseline />
          <RouterProvider router={router} />
        </GlobalSnackbarProvider>
      </ThemeProvider>
    </LoadingProvider>
  </React.StrictMode>
);
