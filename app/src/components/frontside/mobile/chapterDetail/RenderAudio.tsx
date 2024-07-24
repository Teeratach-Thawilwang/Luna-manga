import { useEffect, useRef, useState } from "react";

import styled from "styled-components";

import ChapterService from "@services/frontside/ChapterService";

export default function RenderAudio({ url, sequence }: { url: string; sequence: number }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioCurrent = ChapterService.getAudioCurrentNumber();

  useEffect(() => {
    function checkScroll() {
      if (audioRef.current) {
        const rect = audioRef.current.getBoundingClientRect();
        const isAboveBottomFrame = rect.top < window.innerHeight;
        const isPlayCondition = isAboveBottomFrame;
        if (isPlayCondition && !isPlay) {
          setIsPlay(true);
          ChapterService.update({ audio_current: sequence });
        }
      }
    }

    window.addEventListener("scroll", checkScroll);
    window.addEventListener("load", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.removeEventListener("load", checkScroll);
    };
  }, [isPlay]);

  useEffect(() => {
    if (audioRef.current && isLoaded) {
      if (isPlay && audioCurrent == sequence) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlay, audioCurrent]);

  return (
    <Box>
      <Audio ref={audioRef} src={url} onLoadedMetadata={() => setIsLoaded(true)} controls />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin: 0px;
  width: 100%;
  height: 0px;
`;

const Audio = styled.audio`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin: 0px;
  width: 100%;
  height: 0px;
  visibility: hidden;
`;
