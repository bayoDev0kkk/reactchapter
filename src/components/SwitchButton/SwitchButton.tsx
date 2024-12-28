import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

interface SwitchButtonProps {
  toggleView: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ toggleView }) => {
  return (
    <ButtonWrapper>
      <button onClick={toggleView}>Switch to Timer/Countdown</button>
    </ButtonWrapper>
  );
};

export default SwitchButton;