import React, { Suspense, lazy, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import FooterMobile from "@components/mobile/Footer";
import DetailMobile from "@components/mobile/chapterDetail/Detail";
import NavbarMobile from "@components/mobile/navbar/Navbar";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import ChapterCommentService from "@services/ChapterCommentService";
import ChapterService from "@services/ChapterService";
import StorySearchService from "@services/StorySearchService";
import WidgetOnPageService from "@services/WidgetOnPageService";
import { getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const DetailTablet = lazy(() => import("@components/tablet/chapterDetail/Detail"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));

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
      <Suspense fallback={<Box />}>
        <Box>
          <NavbarMobile />
          <DetailMobile />
          <FooterMobile isShow={isFooterShow} />
        </Box>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Box />}>
      <Box>
        <NavbarTablet />
        <DetailTablet />
        <FooterTablet isShow={isFooterShow} />
      </Box>
      <GoTopButtonTablet />
    </Suspense>
  );
});

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100lvh;

  display: flex;
  flex-direction: column;
`;
