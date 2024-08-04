import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import CustomHelmet from "@components/frontside/CustomHelmet";
import FooterMobile from "@components/frontside/mobile/Footer";
import NavbarMobile from "@components/frontside/mobile/navbar/Navbar";
import DetailMobile from "@components/frontside/mobile/storyDetail/Detail";
import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import DetailTablet from "@components/frontside/tablet/storyDetail/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import StoryChapterService from "@services/frontside/StoryChapterService";
import StorySearchService from "@services/frontside/StorySearchService";
import StoryService from "@services/frontside/StoryService";
import WidgetOnPageService from "@services/frontside/WidgetOnPageService";
import { getResponsive } from "@utils/Hooks";

export default React.memo(function StoryDetail() {
  // console.log("In StoryDetail");
  const { slug } = useParams();
  const urlParams = new URLSearchParams(window.location.search);
  const page = Number(urlParams.get("page") ?? 1);
  const responsive = getResponsive();
  const story = StoryService.getStory();
  const isStoryLoaded = StoryService.getStoryIsLoaded();
  const isStoryChapterLoaded = StoryChapterService.getStoryChapterIsLoaded();
  const isWidgetOnPageLoaded = WidgetOnPageService.getIsLoaded();
  const isFooterShow = isStoryLoaded && isStoryChapterLoaded && isWidgetOnPageLoaded;
  const title = story?.name ?? "Luna";
  const description = `อ่าน ${story?.name ?? "มังงะ นิยาย"}`;

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
    if (isStoryChapterLoaded || story?.slug != slug!) {
      StoryChapterService.loadStoryChapter(slug!, page);
    }
  }, [story, page]);

  if (responsive === ResponsiveEnum.MOBILE) {
    return (
      <Box>
        <CustomHelmet title={title} description={description} />
        <NavbarMobile />
        <DetailMobile />
        <FooterMobile isShow={isFooterShow} />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <CustomHelmet title={title} description={description} />
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
