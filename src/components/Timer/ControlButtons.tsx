import React, { memo } from 'react';
import { Button, Box } from '@mui/material';

interface ControlButtonsProps {
  startTimer: () => void;
  resetTimer: () => void;
  isRunning: boolean;
}

export const ControlButtons: React.FC<ControlButtonsProps> = memo(({ startTimer, resetTimer, isRunning }) => {
  return (
    <Box>
      <Button
        variant="contained"
        color={isRunning ? 'secondary' : 'primary'}
        onClick={startTimer}
        sx={{ marginRight: '10px' }}
      >
        {isRunning ? 'Пауза' : 'Старт'}
      </Button>
      <Button variant="contained" color="error" onClick={resetTimer}>
        Сброс
      </Button>
    </Box>
  );
});
