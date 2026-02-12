import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 1,
        height: "100%",
      }}
    >
      {[0, 1, 2].map((dot) => (
        <Box
          key={dot}
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: "#000000",
            animation: "bounce 0.6s infinite alternate",
            animationDelay: `${dot * 0.2}s`,
            "@keyframes bounce": {
              from: {
                transform: "translateY(0)",
                opacity: 0.7,
              },
              to: {
                transform: "translateY(-10px)",
                opacity: 1,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default Loader;
