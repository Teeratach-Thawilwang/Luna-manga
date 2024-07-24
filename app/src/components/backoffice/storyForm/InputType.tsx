import { useEffect } from "react";

import styled from "styled-components";

import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import StoryCreateEditService from "@services/backoffice/StoryCreateEditService";

export default function InputType({ initial }: { initial?: CategoryTypeEnum }) {
  let type = getChapterType(initial ? initial : null);

  useEffect(() => {
    if (initial) {
      StoryCreateEditService.update({ type: initial });
    }
  }, []);

  return (
    <Box>
      <Title>Type</Title>
      <Input maxLength={50} type="text" value={type} disabled={true} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: 20px;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;
  font-size: 20px;
  font-weight: 500;
  color: #505050;

  display: flex;
  align-items: center;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 50px;

  font-family: Segoe UI;
  font-size: 18px;
  color: #000000;
  background-color: #bfc5cc;
  border: 1px solid rgba(0, 0, 0, 0.35);

  border-radius: 5px;
  padding-left: 20px;

  outline: none;
  border: 0 transparent;

  &::placeholder {
    color: #505050;
  }
`;

function getChapterType(type: string | null): string {
  if (type == CategoryTypeEnum.MANGA) {
    return "Manga";
  }

  if (type == CategoryTypeEnum.NOVEL) {
    return "Novel";
  }

  return "";
}
