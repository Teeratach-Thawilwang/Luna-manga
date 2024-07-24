import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import styled from "styled-components";

import AudioDisplayTime from "@components/backoffice/mangaEditor/AudioDisplayTime";
import AudioProgressBar from "@components/backoffice/mangaEditor/AudioProgressBar";
import AudioVolume from "@components/backoffice/mangaEditor/AudioVolume";
import PauseIcon from "@components/iconSvg/PauseIcon";
import PlayIcon from "@components/iconSvg/PlayIcon";
import XIcon from "@components/iconSvg/XIcon";
import { MangaEditorElement } from "@interfaces/EditorInterface";

interface RenderAudioInterface {
  node: MangaEditorElement;
  setNodes: Dispatch<SetStateAction<MangaEditorElement[]>>;
}

export default React.memo(function RenderAudio({ node, setNodes }: RenderAudioInterface) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioUrl = node.url;

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, [node]);

  function onDeleteHandle() {
    setNodes((nodes) => {
      return Array.from(nodes).filter((prevNode) => {
        const isTypeMatch = prevNode.type == node.type;
        const isUrlMatch = prevNode.url == node.url;
        return !(isTypeMatch && isUrlMatch);
      });
    });
  }

  function onPlayPauseHandle() {
    if (audioRef == null || audioRef.current == null) {
      return;
    }

    setCurrentTime(audioRef.current.currentTime);
    setIsPlaying((prev) => !prev);
  }

  function onLoadedMetadataHandle() {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }

  function onChangeSecondsHandle(event: any) {
    const value = parseFloat(event.target.value);
    if (audioRef.current) {
      if (isNaN(audioRef.current.duration)) {
        return;
      }
      const seconds = Number((value * duration).toFixed(2));
      setCurrentTime(seconds);
    }
  }

  function onEndedHandle() {
    if (audioRef.current == null) {
      return;
    }

    if (audioRef.current.currentTime < duration) {
      return;
    }

    if (audioRef.current.currentTime >= duration) {
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }

  useEffect(() => {
    if (audioRef == null || audioRef.current == null) {
      return;
    }

    if (isPlaying) {
      audioRef.current.currentTime = currentTime;
      audioRef.current.play();
    }

    if (!isPlaying) {
      audioRef.current.currentTime = currentTime;
      audioRef.current.pause();
    }
  }, [audioRef, isPlaying, currentTime]);

  return (
    <Box>
      <Audio ref={audioRef} src={audioUrl} onLoadedMetadata={onLoadedMetadataHandle} onTimeUpdate={onEndedHandle} />
      <PlayIconBox onClick={onPlayPauseHandle}>{isPlaying ? <PauseIcon /> : <PlayIcon />}</PlayIconBox>
      <AudioDisplayTime seconds={currentTime} duration={duration} isCounting={isPlaying} />
      <AudioProgressBar seconds={currentTime} duration={duration} isCounting={isPlaying} onChange={onChangeSecondsHandle} />
      <AudioVolume audioRef={audioRef} />
      <CloseIconBox onClick={onDeleteHandle}>
        <XIcon />
      </CloseIconBox>
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 5px;
  margin: 5px 0px;
  height: 50px;

  display: flex;
  align-items: center;

  background-color: #363636;
`;

const Audio = styled.audio`
  visibility: none;
`;

const IconBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 35px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    /* border: 1px solid red; */
    width: 25px;
    height: 25px;
    fill: #ffffff;
  }

  path {
    fill: #ffffff;
    stroke-width: 1px;
    stroke: #ffffff;
  }

  &:hover {
    cursor: pointer;
  }
`;

const PlayIconBox = styled(IconBox)`
  /* border: 1px solid red; */
  margin-left: 10px;
`;

const CloseIconBox = styled(IconBox)`
  /* border: 1px solid red; */
  margin-left: auto;
  margin-right: 10px;
`;
