import React, { memo } from 'react';
import { Typography } from '@mui/material';
import { formatTime } from '../../utils/utils';  // Импорт функции formatTime

interface TimerDisplayProps {
  time: number;
}

export const TimerDisplay: React.FC<TimerDisplayProps> = memo(({ time }) => {
  const formattedTime = formatTime(time);  // Теперь используем formatTime

  return (
    <Typography variant="h5" sx={{ fontFamily: 'monospace', fontSize: '2rem', marginBottom: '20px' }}>
      {formattedTime}
    </Typography>
  );
});