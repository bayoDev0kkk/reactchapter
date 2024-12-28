import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const TimeDisplay = styled.div`
  font-size: 2rem;
  font-family: 'Roboto', sans-serif;
`;

const Timer = React.memo(() => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;
    return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds
      .toString()
      .padStart(3, '0')}`;
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <TimerContainer>
      <h1>Timer</h1>
      <TimeDisplay>{formatTime(time)}</TimeDisplay>
      <div>
        <Button variant="contained" color="primary" onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleReset}
          style={{ marginLeft: '8px' }}
        >
          Reset
        </Button>
      </div>
    </TimerContainer>
  );
});

export default Timer;