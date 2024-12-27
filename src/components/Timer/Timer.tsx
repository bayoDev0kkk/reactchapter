import React, { useState, useEffect, useCallback, memo } from "react";
import { Box, Typography } from "@mui/material";
import { TimerDisplay } from "./TimerDisplay";
import { ControlButtons } from "./ControlButtons";

export const Timer: React.FC = memo(() => {
  const [time, setTime] = useState(0); // Время в миллисекундах
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (!isRunning) {
      const id = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning((prevState) => !prevState);
  }, [isRunning, intervalId]);

  const resetTimer = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsRunning(false);
    setTime(0);
  }, [intervalId]);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <Box sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4">Таймер</Typography>
      <TimerDisplay time={time} />
      <ControlButtons
        startTimer={startTimer}
        resetTimer={resetTimer}
        isRunning={isRunning}
      />
    </Box>
  );
});


export default Timer