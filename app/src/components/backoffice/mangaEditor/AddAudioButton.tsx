import { Dispatch, SetStateAction } from "react";

import styled from "styled-components";

import LibraryMusicIcon from "@components/iconSvg/LibraryMusicIcon";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { MangaEditorElement } from "@interfaces/EditorInterface";
import ValidationService from "@services/ValidationService";

export default function AddAudioButton({ setNodes }: { setNodes: Dispatch<SetStateAction<MangaEditorElement[]>> }) {
  function onChangeHandle(event: any) {
    event.preventDefault();
    const files = event.target.files;
    if (files.length <= 0) {
      return;
    }

    if (!ValidationService.validateFileSize(files[0], 2)) {
      alert("ไฟล์ต้องมีขนาดไม่เกิน 2MB");
      return;
    }

    if (!ValidationService.validateFileType(files[0], ["audio/mpeg"])) {
      alert("ต้องเป็นไฟล์ MP3 เท่านั้น");
      // alert(`ต้องเป็นไฟล์ ${typeArray.toString()} เท่านั้น`);
      return;
    }

    const audioNode = createAudioNodes(files[0]);
    setNodes((prev) => [...prev, audioNode]);
    event.target.value = "";
  }

  return (
    <Box htmlFor="input-music">
      <IconBox>
        <LibraryMusicIcon />
      </IconBox>
      <Input type="file" accept=".mp3,audio/*" id="input-music" onChange={onChangeHandle} />
      <Text>Upload Sound</Text>
    </Box>
  );
}

const Box = styled.label`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 200px;
  height: 50px;
  border-radius: 5px;
  background-color: #363636;
  margin-left: 20px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const IconBox = styled.div`
  /* border: 1px solid green; */
  box-sizing: border-box;
  width: 30px;
  height: 30px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 30px;
    height: 30px;
  }

  path {
    fill: #d14e8b;
  }
`;

const Input = styled.input`
  border: 1px solid red;
  width: 100%;

  margin: 0 auto 0 auto;
  opacity: 0;
  position: absolute;
  z-index: -1;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;
  margin-left: 10px;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

function createAudioNodes(file: File) {
  return {
    type: ElementTypeEnum.AUDIO,
    file: file,
    url: URL.createObjectURL(file),
  };
}
