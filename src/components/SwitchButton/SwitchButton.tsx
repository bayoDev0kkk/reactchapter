import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

const ButtonWrapper = styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface SwitchButtonProps {
    toggleView: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ toggleView }) => {
    return (
        <ButtonWrapper>
            <Button variant='contained' color='success' onClick={toggleView}>
                Switch to Timer/Countdown
            </Button>
        </ButtonWrapper>
    );
};

export default SwitchButton;
