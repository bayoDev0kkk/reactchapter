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
    const startTimeRef = useRef<number | null>(null);
    const elapsedRef = useRef<number>(0);

    const formatTime = useCallback((time: number) => {
        const date = new Date(time);
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        const milliseconds = date.getUTCMilliseconds();
        return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
    }, []);

    useEffect(() => {
        let animationFrame: number;

        const updateTimer = () => {
            if (isRunning && startTimeRef.current !== null) {
                const now = Date.now();
                setTime(elapsedRef.current + (now - startTimeRef.current));
                animationFrame = requestAnimationFrame(updateTimer);
            }
        };

        if (isRunning) {
            startTimeRef.current = Date.now();
            animationFrame = requestAnimationFrame(updateTimer);
        } else {
            if (startTimeRef.current !== null) {
                elapsedRef.current += Date.now() - startTimeRef.current;
            }
            startTimeRef.current = null;
        }

        return () => cancelAnimationFrame(animationFrame);
    }, [isRunning]);

    const handleStartPause = () => {
        setIsRunning(prev => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
        elapsedRef.current = 0;
        startTimeRef.current = null;
    };

    return (
        <TimerContainer>
            <h1>Timer</h1>
            <TimeDisplay>{formatTime(time)}</TimeDisplay>
            <div>
                <Button variant='contained' color='primary' onClick={handleStartPause}>
                    {isRunning ? 'Pause' : 'Start'}
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleReset} style={{ marginLeft: '8px' }}>
                    Reset
                </Button>
            </div>
        </TimerContainer>
    );
});

export default Timer;
