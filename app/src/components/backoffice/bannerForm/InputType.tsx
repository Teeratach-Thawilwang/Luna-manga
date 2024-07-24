import { useEffect } from "react";

import styled from "styled-components";

import { BannerTypeDisplayEnum, BannerTypeEnum } from "@enums/backoffice/BannerTypeEnum";
import BannerCreateEditService from "@services/backoffice/BannerCreateEditService";

export default function InputType({ initial }: { initial?: BannerTypeEnum }) {
  let type = getBannerTypeDisplay(initial ? initial : null);

  useEffect(() => {
    if (initial) {
      BannerCreateEditService.update({ type: initial });
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

function getBannerTypeDisplay(type: BannerTypeEnum | null) {
  switch (type) {
    case BannerTypeEnum.STORY:
      return BannerTypeDisplayEnum.STORY;
    case BannerTypeEnum.CHAPTER:
      return BannerTypeDisplayEnum.CHAPTER;
    case BannerTypeEnum.STORY_WINDOW:
      return BannerTypeDisplayEnum.STORY_WINDOW;
    case BannerTypeEnum.ADVERTISEMENT_SMALL:
      return BannerTypeDisplayEnum.ADVERTISEMENT_SMALL;
    case BannerTypeEnum.ADVERTISEMENT_MEDIUM:
      return BannerTypeDisplayEnum.ADVERTISEMENT_MEDIUM;
    case BannerTypeEnum.ADVERTISEMENT_GROUP:
      return BannerTypeDisplayEnum.ADVERTISEMENT_GROUP;
    default:
      return "";
  }
}
