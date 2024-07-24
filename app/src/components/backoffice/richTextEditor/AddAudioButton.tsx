import { BaseEditor, Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";

import styled from "styled-components";

import LibraryMusicIcon from "@components/iconSvg/LibraryMusicIcon";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import ValidationService from "@services/ValidationService";

export default function AddAudioButton() {
  const editor = useSlate();

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

    insertNode(editor, files[0]);
    event.target.value = "";
    ReactEditor.focus(editor as ReactEditor);
  }

  return (
    <Box>
      <IconBox htmlFor="input-music">
        <LibraryMusicIcon />
      </IconBox>
      <Input type="file" accept=".mp3,audio/*" id="input-music" onChange={onChangeHandle} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  width: 35px;
  height: 25px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.label`
  /* border: 1px solid green; */
  width: 35px;
  height: 25px;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 25px;
    height: 25px;
  }

  path {
    fill: #000;
  }

  &:hover {
    cursor: pointer;
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

function createAudioNode(file: File) {
  return {
    type: ElementTypeEnum.AUDIO,
    children: [{ text: "" }],
    file: file,
  };
}

function createTextNode() {
  return {
    type: ElementTypeEnum.TEXT,
    children: [{ text: "" }],
  };
}

function insertNode(editor: BaseEditor, file: File) {
  Transforms.insertNodes(editor, createAudioNode(file));
  const selectedNodeIndex = editor.selection?.anchor.path[0];
  const lastIndex = editor.children.length - 1;

  if (selectedNodeIndex != null && selectedNodeIndex == lastIndex) {
    Transforms.insertNodes(editor, createTextNode());
  }
}
