// LoadingContext.js
import React, { createContext, useState, useContext } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const showLoader = () => setLoadingCount((prev) => prev + 1);
  const hideLoader = () => setLoadingCount((prev) => Math.max(prev - 1, 0));

  return (
    <LoadingContext.Provider value={{ loading: loadingCount > 0, showLoader, hideLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
