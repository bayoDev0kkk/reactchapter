import React, { useState, useEffect, useCallback } from 'react';
import { ButtonControl } from './ButtonControl';
import { TimeInput } from './TimeInput';
import { ProgressBar } from './ProgressBar';
import { styled } from '@mui/system';

// Заменили на новый звук
const beepSoundURL = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

const CountdownWrapper = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 500px;
    padding: 20px;
    margin: 0 auto;
    background-color: #f7f7f7;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled('h1')`
    font-size: 2rem;
    margin-bottom: 20px;
    font-weight: bold;
    color: #333;
`;

const TimeDisplay = styled('div')`
    font-size: 3rem;
    font-weight: bold;
    margin: 20px 0;
    color: #1976d2;
    text-align: center;
`;

const Countdown: React.FC = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    // Звуковое оповещение
    const beep = new Audio(beepSoundURL);

    // useEffect для отслеживания времени и проигрывания звука
    useEffect(() => {
        if (timeLeft <= 0 && intervalId) {
            beep.play(); // Воспроизводим звук
            clearInterval(intervalId); // Останавливаем таймер
        }
    }, [timeLeft, intervalId]);

    // useEffect для установки начальных значений таймера
    useEffect(() => {
        setSliderValue(minutes * 60 + seconds);
        setTimeLeft(minutes * 60 + seconds);
    }, [minutes, seconds]);

    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinutes(Math.min(Math.max(Number(e.target.value), 0), 720));
    };

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeconds(Math.min(Math.max(Number(e.target.value), 0), 59));
    };

    const handleSliderChange = (e: Event, newValue: number | number[]) => {
        const newSliderValue = Array.isArray(newValue) ? newValue[0] : newValue;
        setSliderValue(newSliderValue);
        const newMinutes = Math.floor(newSliderValue / 60);
        const newSeconds = newSliderValue % 60;
        setMinutes(newMinutes);
        setSeconds(newSeconds);
    };

    const startTimer = useCallback(() => {
        setIsRunning(true);
        const id = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(id);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
        setIntervalId(id);
    }, []);

    const pauseTimer = () => {
        setIsRunning(false);
        if (intervalId) clearInterval(intervalId);
    };

    const resetTimer = () => {
        setIsRunning(false);
        if (intervalId) clearInterval(intervalId);
        setTimeLeft(minutes * 60 + seconds);

        // Останавливаем музыку и сбрасываем её
        beep.pause();
        beep.currentTime = 0;
    };

    const progress = (timeLeft / (minutes * 60 + seconds)) * 100;

    return (
        <CountdownWrapper>
            <Title>Countdown Timer</Title>
            <TimeInput
                minutes={minutes}
                seconds={seconds}
                onMinutesChange={handleMinutesChange}
                onSecondsChange={handleSecondsChange}
                onSliderChange={handleSliderChange}
                sliderValue={sliderValue}
            />
            <TimeDisplay>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </TimeDisplay>
            <ProgressBar progress={progress} />
            <ButtonControl
                isRunning={isRunning}
                startTimer={startTimer}
                pauseTimer={pauseTimer}
                resetTimer={resetTimer}
            />
        </CountdownWrapper>
    );
};

export default Countdown;
