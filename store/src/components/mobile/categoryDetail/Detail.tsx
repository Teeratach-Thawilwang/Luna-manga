import { MutableRefObject, useRef } from "react";

import styled from "styled-components";

import BoxLoading from "@components/mobile/BoxLoading";
import Logo from "@components/mobile/Logo";
import WidgetItem from "@components/mobile/WidgetItem";
import CategeryContent from "@components/mobile/categoryDetail/CategeryContent";
import CategeryHeader from "@components/mobile/categoryDetail/CategeryHeader";
import { WidgetTypeEnum } from "@enums/WidgetTypeEnum";
import CategoryService from "@services/CategoryService";
import WidgetOnPageService from "@services/WidgetOnPageService";
import { box } from "@utils/Themes";

export default function Detail() {
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const isCategoryLoading = CategoryService.getIsLoading();
  const isWidgetOnPageLoading = !WidgetOnPageService.getIsLoaded();

  if (isCategoryLoading || isWidgetOnPageLoading) {
    return (
      <Box>
        <Logo />
        <BoxLoading />
      </Box>
    );
  }

  return (
    <Box>
      <Logo />
      <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_GROUP} />
      <CategeryHeader contentRef={contentRef} />
      <CategeryContent contentRef={contentRef} />
      <WidgetItem type={WidgetTypeEnum.STORY_LIST} />
      <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_MEDIUM} />
      <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_SMALL} />
      <WidgetItem type={WidgetTypeEnum.STORY_WINDOW} />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: 0;
  margin-bottom: ${(props) => box(props).space.xxl};
  padding: 0 5px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;
