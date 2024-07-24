import { useState } from "react";

import styled from "styled-components";

import VolumeOffIcon from "@components/iconSvg/VolumeOffIcon";
import VolumeOnIcon from "@components/iconSvg/VolumeOnIcon";
import CookieService from "@services/backoffice/CookieService";

export default function AudioVolume({ audioRef }: { audioRef: any }) {
  const cookieVolume = CookieService.getVolume();
  const [isActive, setisActive] = useState(true);
  const [level, setLevel] = useState(2);

  function onChangeHandle(event: any) {
    const value = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.volume = value;
      setLevel(getVolumeLevel(value));
      CookieService.setVolume(value);
    }
  }

  return (
    <Box>
      <IconBox onClick={() => setisActive((prev) => !prev)}>{isActive ? <VolumeOnIcon level={level} /> : <VolumeOffIcon />}</IconBox>
      <VolumeBar type="range" min="0" max="1" step="0.01" defaultValue={cookieVolume} onChange={onChangeHandle} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 120px;
  height: 100%;

  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  align-items: center;
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
    width: 25px;
    height: 25px;
  }

  path {
    fill: #ffffff;
    stroke-width: 1px;
  }

  &:hover {
    cursor: pointer;
  }
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

function getVolumeLevel(value: number): 0 | 1 | 2 {
  if (value > 0.66) {
    return 2;
  }

  if (value > 0.33) {
    return 1;
  }

  return 0;
}
