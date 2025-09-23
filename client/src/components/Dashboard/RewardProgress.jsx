import React, { useState } from "react";
import { Box, Typography, Stack, Chip, Card, Link } from "@mui/material";

const rewardsArray = [
  { id: 1, name: "Reward 1", status: "Achieved" },
  { id: 2, name: "Reward 2", status: "Achieved" },
  { id: 3, name: "Reward 3", status: "Missed" },
  { id: 4, name: "Reward 4", status: "Missed" },
  { id: 5, name: "Reward 5", status: "Pending" },
  { id: 6, name: "Reward 6", status: "Pending" },
  { id: 7, name: "Reward 7", status: "Pending" },
  { id: 8, name: "Reward 8", status: "Pending" },
  { id: 9, name: "Reward 9", status: "Pending" },
  { id: 10, name: "Reward 10", status: "Pending" },
];

const statusColorMap = {
  pending: "warning",
  achieved: "success",
  missed: "error",
};

const RewardProgress = ({ rewards = rewardsArray, initialVisible = 5 }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleRewards = showAll ? rewards : rewards.slice(0, initialVisible);

  return (
    <Card
      elevation={0}
      sx={{
        width: { xs: "90%", sm: "50%" },
        p: 3,
        mx: "auto",
        mt: { xs: 0, md: 4 },
        borderRadius: 0,
      }}
    >
      <Stack spacing={2}>
        {visibleRewards.map((reward) => (
          <Stack
            key={reward.id}
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ py: 1 }}
          >
            <Typography>{reward.name}</Typography>
            <Chip
              label={reward.status}
              variant="outlined"
              color={statusColorMap[reward.status.toLowerCase()]}
            />
          </Stack>
        ))}

        {rewards.length > initialVisible && (
          <Link
            underline="hover"
            sx={{ mt: 1, display: "block", cursor: "pointer" }}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "less..." : "more..."}
          </Link>
        )}
      </Stack>
    </Card>
  );
};

export default RewardProgress;
