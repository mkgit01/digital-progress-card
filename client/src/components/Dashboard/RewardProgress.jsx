import React, { useState } from "react";
import { Box, Typography, Stack, Card, Link } from "@mui/material";
import { Check } from "@mui/icons-material";

const rewardsArray = [
  { id: 1, name: "Reward 1", status: "Achieved" },
  { id: 2, name: "Reward 2", status: "Achieved" },
  { id: 3, name: "Reward 3", status: "Missed" },
  { id: 4, name: "Reward 4", status: "Pending" },
  { id: 5, name: "Reward 5", status: "Pending" },
  { id: 6, name: "Reward 6", status: "Pending" },
  { id: 7, name: "Reward 7", status: "Pending" },
];

const RewardProgress = ({ rewards = rewardsArray, initialVisible = 5 }) => {
  const lastAchievedIndex = rewards.reduce(
    (last, r, idx) => (r.status.toLowerCase() === "achieved" ? idx : last),
    -1
  );

  return (
    <Card
      elevation={0}
      sx={{
        width: { xs: "90%", sm: "60%" },
        p: 3,
        mx: "auto",
        mt: { xs: 0, md: 4 },
        borderRadius: 2,
        overflowX: "auto",
      }}
    >
      <Stack
        spacing={3}
        direction={{ xs: "row", md: "column" }}
        alignItems={{ xs: "center", md: "" }}
        sx={{ minWidth: "max-content" }}
      >
        {rewardsArray.map((reward, idx) => {
          const isAchieved = reward.status.toLowerCase() === "achieved";
          const showConnector = idx < rewardsArray.length - 1;

          return (
            <Stack
              key={reward.id}
              direction={{ xs: "column", md: "row" }}
              spacing={3}
              alignItems="center"
              position={"relative"}
            >
              <Stack alignItems="center" sx={{ position: "relative" }}>
                <Box
                  sx={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    border: "2px solid",
                    borderColor: isAchieved ? "success.main" : "grey.700",
                    backgroundColor: isAchieved
                      ? "success.main"
                      : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    zIndex: 1,
                  }}
                >
                  {isAchieved && <Check fontSize="small" />}
                </Box>

                {showConnector && (
                  <>
                    {/* Vertical connector (desktop) */}
                    <Box
                      sx={{
                        display: { xs: "none", md: "block" }, // hide on mobile
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 2,
                        height: "100%",
                        bgcolor:
                          idx <= lastAchievedIndex - 1
                            ? "success.main"
                            : "grey.500",
                      }}
                    />

                    {/* Horizontal connector (mobile) */}
                    <Box
                      sx={{
                        display: { xs: "block", md: "none" }, // show only on mobile
                        position: "absolute",
                        top: "50%",
                        left: "100%",
                        transform: "translateY(-50%)",
                        height: 2,
                        width: 65,
                        bgcolor:
                          idx <= lastAchievedIndex - 1
                            ? "success.main"
                            : "grey.500",
                      }}
                    />
                  </>
                )}
              </Stack>

              <Typography>{reward.name}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
};

export default RewardProgress;
