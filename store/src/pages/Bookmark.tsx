import { Suspense, lazy, useEffect } from "react";

import styled from "styled-components";

import FooterMobile from "@components/mobile/Footer";
import DetailMobile from "@components/mobile/bookmarkDetail/Detail";
import NavbarMobile from "@components/mobile/navbar/Navbar";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import BookmarkService from "@services/BookmarkService";
import StorySearchService from "@services/StorySearchService";
import WidgetOnPageService from "@services/WidgetOnPageService";
import { getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const DetailTablet = lazy(() => import("@components/tablet/bookmarkDetail/Detail"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));

export default function Bookmark() {
  // console.log("In Bookmark");
  document.title = "Luna: บุ๊กมาร์ก";
  const responsive = getResponsive();
  const isBookmarkLoaded = BookmarkService.getIsLoaded();
  const isWidgetOnPageLoaded = WidgetOnPageService.getIsLoaded();
  const isFooterShow = isBookmarkLoaded && isWidgetOnPageLoaded;

  useEffect(() => {
    if (isBookmarkLoaded == false) {
      BookmarkService.loadIndex();
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    if (isWidgetOnPageLoaded == false) {
      WidgetOnPageService.loadWidgetOnPage();
    }

    return () => {
      StorySearchService.clearState();
    };
  }, []);

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
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100lvh;

  display: flex;
  flex-direction: column;
`;
