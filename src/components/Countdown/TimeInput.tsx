import React from 'react';
import { Slider, TextField } from '@mui/material';
import { styled } from '@mui/system';

const TimeInputWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const TimeInput: React.FC<{
  minutes: number;
  seconds: number;
  onMinutesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSecondsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSliderChange: (e: Event, newValue: number | number[]) => void;
  sliderValue: number;
}> = ({ minutes, seconds, onMinutesChange, onSecondsChange, onSliderChange, sliderValue }) => {
  return (
    <TimeInputWrapper>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <TextField
          label="Minutes"
          type="number"
          value={minutes}
          onChange={onMinutesChange}
          inputProps={{ min: 0, max: 720 }}
          sx={{ width: 100 }}
        />
        <TextField
          label="Seconds"
          type="number"
          value={seconds}
          onChange={onSecondsChange}
          inputProps={{ min: 0, max: 59 }}
          sx={{ width: 100 }}
        />
      </div>
      <Slider
        value={sliderValue}
        onChange={onSliderChange}
        min={0}
        max={7200}
        step={15}
        sx={{ width: '100%', maxWidth: 500 }}
      />
    </TimeInputWrapper>
  );
};

export { TimeInput };