import { useEffect, useState } from "react";

import styled from "styled-components";

interface AudioProgressBarInterface {
  seconds: number;
  duration: number;
  isCounting: boolean;
  onChange: (event: any) => void;
}

export default function AudioProgressBar({ seconds, duration, isCounting, onChange }: AudioProgressBarInterface) {
  const [currentTime, setCurrentTime] = useState<number>(seconds);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isCounting) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 0.1);
      }, 100);
    }

    if (interval && !isCounting) {
      clearInterval(interval);
    }

    setCurrentTime(seconds);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isCounting, seconds]);

  return (
    <Box>
      <VolumeBar type="range" min="0" max="1" step="0.001" value={getPercentile(currentTime, duration)} onChange={onChange} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  flex-grow: 1;
  width: auto;
  height: 100%;

  margin-left: 10px;

  display: flex;
  align-items: center;
`;

const VolumeBar = styled.input`
  /* border: 1px solid red; */
  box-sizing: border-box;

  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 8px;
  outline: none;
  overflow: hidden;

  &:hover {
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    width: 8px;
    height: 8px;
    background: #ffffff;
  }

  &::-moz-range-track {
    width: 8px;
    height: 8px;
    background: #ffffff;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 0px;
    height: 8px;
    background: #d14e8b;
    box-shadow: -399px 0 0 399px #d14e8b;
  }

  &::-moz-range-thumb {
    width: 0px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    box-shadow: -399px 0 0 399px #d14e8b;
  }
`;

function getPercentile(value: number, max: number): number {
  if (max <= 0) {
    return 0;
  }
  return value / max;
}
