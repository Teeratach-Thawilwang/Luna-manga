import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import FooterMobile from "@components/frontside/mobile/Footer";
import DetailMobile from "@components/frontside/mobile/chapterDetail/Detail";
import NavbarMobile from "@components/frontside/mobile/navbar/Navbar";
import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import DetailTablet from "@components/frontside/tablet/chapterDetail/Detail";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import ChapterCommentService from "@services/frontside/ChapterCommentService";
import ChapterService from "@services/frontside/ChapterService";
import StorySearchService from "@services/frontside/StorySearchService";
import WidgetOnPageService from "@services/frontside/WidgetOnPageService";
import { getResponsive } from "@utils/Hooks";

export default React.memo(function ChapterDetail() {
  // console.log("In ChapterDetail");
  const { slug, chapterNumber } = useParams();
  const responsive = getResponsive();
  const chapterId = ChapterService.getChapterId();
  const storyName = ChapterService.getStoryName();
  const isChapterLoaded = ChapterService.getChapterIsLoaded();
  const isCommentLoaded = ChapterCommentService.getCommentIsLoaded();
  const isWidgetOnPageLoaded = WidgetOnPageService.getIsLoaded();
  const isFooterShow = isChapterLoaded && isCommentLoaded && isWidgetOnPageLoaded;

  useEffect(() => {
    if (isWidgetOnPageLoaded == false) {
      WidgetOnPageService.loadWidgetOnPage();
    }

    return () => {
      StorySearchService.clearState();
    };
  }, []);

  useEffect(() => {
    ChapterService.loadShow(slug!, Number(chapterNumber!));
    window.scroll({ top: 0, behavior: "auto" });
    return () => {
      ChapterService.clearState();
    };
  }, [chapterNumber]);

  useEffect(() => {
    if (storyName != null && chapterId != null) {
      document.title = storyName ?? "Luna";
      ChapterCommentService.loadIndex(chapterId, 1);
    }
    return () => {
      ChapterCommentService.clearState();
    };
  }, [storyName]);

  if (responsive === ResponsiveEnum.MOBILE) {
    return (
      <Box>
        <NavbarMobile />
        <DetailMobile />
        <FooterMobile isShow={isFooterShow} />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <NavbarTablet />
        <DetailTablet />
        <FooterTablet isShow={isFooterShow} />
      </Box>
      <GoTopButtonTablet />
    </>
  );
});

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100lvh;

  display: flex;
  flex-direction: column;
`;
