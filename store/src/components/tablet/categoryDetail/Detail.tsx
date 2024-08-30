import { MutableRefObject, useRef } from "react";

import styled from "styled-components";

import BoxLoading from "@components/tablet/BoxLoading";
import WidgetItem from "@components/tablet/WidgetItem";
import CategeryContent from "@components/tablet/categoryDetail/CategeryContent";
import CategeryHeader from "@components/tablet/categoryDetail/CategeryHeader";
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
        <BoxLoading />
      </Box>
    );
  }

  return (
    <Box>
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
  margin: ${(props) => box(props).space.xxl} 0;
  padding: 0 10px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;
