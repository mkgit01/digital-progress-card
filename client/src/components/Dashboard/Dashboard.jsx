import Statistics from "./Statistics";
import RewardProgress from "./RewardProgress";
import { Box, Button, TextField, Grid, Stack } from "@mui/material";

const Dashboard = () => {
  return (
    <Stack width={"100%"} minWidth={"100vw"} py={4}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, md: 8 }}>
          <Statistics />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <RewardProgress />
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="form"
          sx={{
            mt:3,
            width: "100%",
            maxWidth: {xs:"250px",md:"500px"},
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField fullWidth label="Total work done today" size="small"/>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
