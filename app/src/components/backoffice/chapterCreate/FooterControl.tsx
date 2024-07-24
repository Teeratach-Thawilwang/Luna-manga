import { useState } from "react";

import styled from "styled-components";

import { CollectionEnum } from "@enums/backoffice/CollectionEnum";
import ChapterCreateEditService from "@services/backoffice/ChapterCreateEditService";
import FileService from "@services/backoffice/FileService";
import { createTextForUpload, createValidateParams, isValid } from "@utils/ChapterCreateUpdateHelpers";

export default function FooterControl() {
  const state = ChapterCreateEditService.getState();
  const [isUploading, setIsUploading] = useState(false);
  const [percentBar, setPercentBar] = useState(0);

  async function onCreate() {
    const validateParams = createValidateParams(state);
    ChapterCreateEditService.update({ ...validateParams });
    if (!isValid(validateParams)) {
      return;
    }

    setIsUploading(true);
    try {
      const text = await createTextForUpload(state, setPercentBar);
      const coverImageUploaded = await FileService.uploadFile(state.cover_image as File, CollectionEnum.CHAPTER_COVER_IMAGE);
      ChapterCreateEditService.createChapter(
        state.story!.id,
        state.name!,
        state.chapter_number!,
        state.type!,
        state.status!,
        text,
        coverImageUploaded.id,
      );
    } catch (error) {
      setIsUploading(false);
    }
  }

  return (
    <Box>
      {isUploading ? (
        <ProgressBar>
          <PercentBar type="range" min="0" max="100" step="1" value={percentBar} readOnly />
          <PercentText>{percentBar} %</PercentText>
        </ProgressBar>
      ) : null}
      <UpdateButton onClick={onCreate}>Create</UpdateButton>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 20px;
  margin: auto 0 0 0;
  height: 60px;
  width: 100%;

  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  outline: none;
  overflow: hidden;

  color: #000000;
  background-color: #ffffff;

  display: flex;
  align-items: center;
`;

const UpdateButton = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  border-radius: 5px;
  height: 40px;
  width: 125px;
  margin-left: auto;
  margin-right: 20px;

  font-size: 18px;
  color: #fff;
  background-color: #3ba639;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #44b642;
    cursor: pointer;
  }

  &:active {
    background-color: #349f32;
  }
`;

const ProgressBar = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  flex-grow: 1;
  width: auto;
  height: 100%;

  margin-left: 10px;
  margin-right: 10px;

  display: flex;
  align-items: center;
`;

const PercentBar = styled.input`
  /* border: 1px solid red; */
  box-sizing: border-box;

  -webkit-appearance: none;
  appearance: none;
  height: 15px;
  outline: none;
  overflow: hidden;
  flex-grow: 1;
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }

  &::-webkit-slider-runnable-track {
    width: 8px;
    height: 15px;
    background: #363636;
  }

  &::-moz-range-track {
    width: 8px;
    height: 15px;
    background: #363636;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 0px;
    height: 15px;
    background: #d14e8b;
    box-shadow: -1000px 0 0 1000px #d14e8b;
  }

  &::-moz-range-thumb {
    width: 0px;
    height: 20px;
    border-radius: 50%;
    background: #4caf50;
    box-shadow: -1000px 0 0 1000px #d14e8b;
  }
`;

const PercentText = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding-left: 5px;
  padding-right: 5px;

  height: 100%;
  font-size: 18px;
  color: #000;

  display: flex;
  justify-content: center;
  align-items: center;
`;
