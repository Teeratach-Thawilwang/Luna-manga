import { Dispatch, SetStateAction } from "react";

import styled from "styled-components";

import ImageIcon from "@components/iconSvg/ImageIcon";
import { ElementTypeEnum } from "@enums/SlateEditorEnum";
import { MangaEditorElement } from "@interfaces/EditorInterface";
import ValidationService from "@services/ValidationService";

export default function AddImageButton({ setNodes }: { setNodes: Dispatch<SetStateAction<MangaEditorElement[]>> }) {
  function onChangeHandle(event: any) {
    event.preventDefault();
    const files = event.target.files;
    if (files.length <= 0) {
      return;
    }

    if (files.length >= 30) {
      alert("เลือกรูปได้ไม่เกิน 30 รูป");
      return;
    }

    if (!validateFileSize(files, 2)) {
      alert("ไฟล์ต้องมีขนาดไม่เกิน 2MB");
      return;
    }

    const imageNodes = createImageNodes(files);
    setNodes((prev) => [...prev, ...imageNodes]);
    event.target.value = "";
  }

  return (
    <Box htmlFor="input-images">
      <IconBox>
        <ImageIcon />
      </IconBox>
      <Input type="file" accept="image/*" id="input-images" multiple onChange={onChangeHandle} />
      <Text>Upload File</Text>
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

function validateFileSize(files: File[], sizeMB: number = 2): boolean {
  return Array.from(files).some((file) => ValidationService.validateFileSize(file, sizeMB));
}

function createImageNodes(files: File[]) {
  return Array.from(files).map((file) => {
    return {
      type: ElementTypeEnum.IMAGE,
      file: file,
      url: URL.createObjectURL(file),
    };
  });
}
