import React, { Suspense, lazy, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import styled from "styled-components";

import FooterMobile from "@components/mobile/Footer";
import NavbarMobile from "@components/mobile/navbar/Navbar";
import DetailMobile from "@components/mobile/storyDetail/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import StoryChapterService from "@services/StoryChapterService";
import StorySearchService from "@services/StorySearchService";
import StoryService from "@services/StoryService";
import WidgetOnPageService from "@services/WidgetOnPageService";
import { getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));
const DetailTablet = lazy(() => import("@components/tablet/storyDetail/Detail"));

export default React.memo(function StoryDetail() {
  // console.log("In StoryDetail");
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const responsive = getResponsive();
  const story = StoryService.getStory();
  const isStoryLoaded = StoryService.getStoryIsLoaded();
  const isStoryChapterLoaded = StoryChapterService.getStoryChapterIsLoaded();
  const isWidgetOnPageLoaded = WidgetOnPageService.getIsLoaded();
  const isFooterShow = isStoryLoaded && isStoryChapterLoaded && isWidgetOnPageLoaded;

  useEffect(() => {
    if (isStoryLoaded == false || story?.slug != slug!) {
      StoryService.loadStory(slug!);
      window.scroll({ top: 0, behavior: "auto" });
    }

    if (isWidgetOnPageLoaded == false) {
      WidgetOnPageService.loadWidgetOnPage();
    }

    return () => {
      StorySearchService.clearState();
    };
  }, [slug]);

  useEffect(() => {
    if (slug != undefined) {
      StoryChapterService.loadStoryChapter(slug!, page);
    }
  }, [slug, page]);

  useEffect(() => {
    document.title = story?.name ?? "Luna";
  }, [story]);

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
