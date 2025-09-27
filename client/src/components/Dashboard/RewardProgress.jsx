import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Card,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import { Check } from "@mui/icons-material";
import { FaChevronDown } from "react-icons/fa";

const HorizontalConnector = () => (
  <StepConnector
    sx={{
      [`& .MuiStepConnector-line`]: {
        borderColor: "grey.700",
        borderTopWidth: 2,
      },
      top: "12px",
      left: "calc(-50%)",
      right: "calc(50% + 12px)",
    }}
  />
);

const VerticalConnector = () => (
  <StepConnector
    sx={{
      [`& .MuiStepConnector-line`]: {
        borderColor: "grey.700",
        borderLeftWidth: 2,
        marginLeft: "12px",
        minHeight: 50,
      },
    }}
  />
);

const RewardProgress = ({ rewards, totalProgress, target }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const orientation = isMdUp ? "vertical" : "horizontal";
  const progressPercent = (totalProgress / target) * 100;

  const rewardsWithStatus = rewards.map((r) => {
    const rewardPercent = parseInt(r.unit.replace("%", ""), 10);
    return { ...r, isAchieved: progressPercent >= rewardPercent };
  });

  

  return (
    <Card
      elevation={0}
      sx={{
        width: { xs: "100%", sm: "70%" },
        p: 2,
        mx: "auto",
        borderRadius: 0,
      }}
    >
      {/* Scrollable container */}
       <Typography >
        Reward Progress: {totalProgress} / {target} ({progressPercent.toFixed(2)}%)
      </Typography>
      <Box
        sx={{
          overflowX: orientation === "horizontal" ? "auto" : "hidden",
          overflowY: orientation === "vertical" ? "auto" : "hidden",
          maxHeight: orientation === "vertical" ? 400 : "auto", // vertical max height
          maxWidth: orientation === "horizontal" ? "100%" : "auto", // horizontal max width
          mt: 2,
        }}
      >
        <Stepper
          activeStep={rewardsWithStatus.filter((r) => r.isAchieved).length - 1}
          orientation={orientation}
          alternativeLabel={orientation === "horizontal"}
          connector={
            orientation === "horizontal" ? <HorizontalConnector /> : <VerticalConnector />
          }
          sx={{
            display: "flex",
            flexDirection: orientation === "horizontal" ? "row" : "column",
            flexWrap: "nowrap",
            [`& .MuiStepLabel-root`]: { margin: 0, padding: 0 },
            [`& .MuiStepLabel-iconContainer`]: { padding: 0 },
            [`& .MuiStepConnector-root`]: { margin: 0 },
          }}
        >
          {rewardsWithStatus.map((reward, idx) => (
            <Step key={reward._id || idx} completed={reward.isAchieved} >
              <StepLabel
                StepIconComponent={() => (
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: reward.isAchieved ? "success.main" : "grey.700",
                      backgroundColor: reward.isAchieved ? "success.main" : "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      zIndex:1000
                    }}
                  >
                    {reward.isAchieved && <Check fontSize="small" />}
                  </Box>
                )}
              >
                <Box display={{ xs: "none", md: "flex" }} alignItems="center">
                  <Typography sx={{ fontSize: 14 }} ml={2}>
                    {`${reward.name} (${reward.unit})`}
                  </Typography>
                </Box>
                <Box
                  display={{ xs: "flex", md: "none" }}
                  flexDirection="column"
                  alignItems="center"
                >
                  <Typography>{`${reward.unit}`}</Typography>
                  <Typography sx={{ fontSize: 14 }}>{`${reward.name}`}</Typography>
                </Box>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Card>
  );
};

export default RewardProgress;
