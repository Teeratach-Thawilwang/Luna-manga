import { useEffect, useMemo, useState } from "react";

import styled from "styled-components";

interface AudioDisplayTimeInterface {
  seconds: number;
  duration: number;
  isCounting: boolean;
}

export default function AudioDisplayTime({ seconds, duration, isCounting }: AudioDisplayTimeInterface) {
  const [currentTime, setCurrentTime] = useState<number>(seconds);
  const totalTime = useMemo(() => formatTime(duration), [duration]);
  const isShowHour = useMemo(() => duration > 3600, [duration]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isCounting && duration != 0) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
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
      {formatTime(currentTime, isShowHour)} / {totalTime}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  font-size: 18px;
  min-width: 60px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

function formatTime(time: number, isShowHours: boolean = false): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  if (hours >= 1 || isShowHours) {
    return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}
