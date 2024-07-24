import { useEffect } from "react";

import styled from "styled-components";

import { WidgetTypeDisplayEnum, WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";
import WidgetCreateEditService from "@services/backoffice/WidgetCreateEditService";

export default function InputType({ initial }: { initial: WidgetTypeEnum }) {
  const displayType = getWidgetTypeDisplay(initial);
  useEffect(() => {
    WidgetCreateEditService.update({ type: initial });
  }, []);

  return (
    <Box>
      <Title>Type</Title>
      <Input maxLength={50} type="text" value={displayType} disabled={true} />
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

function getWidgetTypeDisplay(type: WidgetTypeEnum | null) {
  switch (type) {
    case WidgetTypeEnum.STORY_LIST:
      return WidgetTypeDisplayEnum.STORY_LIST;
    case WidgetTypeEnum.STORY_WINDOW:
      return WidgetTypeDisplayEnum.STORY_WINDOW;
    case WidgetTypeEnum.STORY_GROUP:
      return WidgetTypeDisplayEnum.STORY_GROUP;
    case WidgetTypeEnum.CHAPTER_GROUP:
      return WidgetTypeDisplayEnum.CHAPTER_GROUP;
    case WidgetTypeEnum.ADVERTISEMENT_SMALL:
      return WidgetTypeDisplayEnum.ADVERTISEMENT_SMALL;
    case WidgetTypeEnum.ADVERTISEMENT_MEDIUM:
      return WidgetTypeDisplayEnum.ADVERTISEMENT_MEDIUM;
    case WidgetTypeEnum.ADVERTISEMENT_GROUP:
      return WidgetTypeDisplayEnum.ADVERTISEMENT_GROUP;
    default:
      return "";
  }
}
