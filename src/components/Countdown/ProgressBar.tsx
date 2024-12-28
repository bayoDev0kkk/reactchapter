import React from 'react';
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/system';

const ProgressWrapper = styled('div')`
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
`;

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <ProgressWrapper>
      <LinearProgress variant="determinate" value={progress} />
    </ProgressWrapper>
  );
};