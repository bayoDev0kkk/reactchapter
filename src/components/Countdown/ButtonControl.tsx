import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const ButtonWrapper = styled('div')`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

interface ButtonControlProps {
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
}

export const ButtonControl: React.FC<ButtonControlProps> = ({
  isRunning,
  startTimer,
  pauseTimer,
  resetTimer,
}) => {
  return (
    <ButtonWrapper>
      <Button
        variant="contained"
        onClick={isRunning ? pauseTimer : startTimer}
        color="primary"
        sx={{
          padding: '10px 20px',
          backgroundColor: isRunning ? '#f44336' : '#4caf50',
          '&:hover': {
            backgroundColor: isRunning ? '#d32f2f' : '#388e3c',
          },
        }}
      >
        {isRunning ? 'Pause' : 'Start'}
      </Button>
      <Button
        variant="outlined"
        onClick={resetTimer}
        color="secondary"
        sx={{
          padding: '10px 20px',
        }}
      >
        Reset
      </Button>
    </ButtonWrapper>
  );
};