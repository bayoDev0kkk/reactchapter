import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

// Стили для компонентов
const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const TimerDisplay = styled.div`
  font-size: 48px;
  margin-bottom: 20px;
`;

const ControlButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
`;

// Timer component
const Timer: React.FC = () => {
  const [time, setTime] = useState(0); // состояние времени в секундах
  const [isRunning, setIsRunning] = useState(false); // состояние, чтобы узнать, работает ли таймер
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // ID интервала

  // Мемоизированный обработчик для старта/паузы
  const toggleTimer = useCallback(() => {
    if (isRunning) {
      clearInterval(intervalId!);
      setIntervalId(null);
    } else {
      const id = setInterval(() => setTime((prev) => prev + 1), 1000);
      setIntervalId(id);
    }
    setIsRunning((prev) => !prev);
  }, [isRunning, intervalId]);

  // Мемоизированный обработчик для сброса
  const resetTimer = useCallback(() => {
    clearInterval(intervalId!);
    setTime(0);
    setIsRunning(false);
    setIntervalId(null);
  }, [intervalId]);

  // Форматирование времени (минуты, секунды)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Очистка интервала при размонтировании компонента
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <TimerContainer>
      <h1>Таймер</h1>
      <TimerDisplay>{formatTime(time)}</TimerDisplay>
      <ControlButton onClick={toggleTimer}>
        {isRunning ? 'Пауза' : 'Запуск'}
      </ControlButton>
      <ControlButton onClick={resetTimer}>Сбросить</ControlButton>
    </TimerContainer>
  );
};

export default Timer;