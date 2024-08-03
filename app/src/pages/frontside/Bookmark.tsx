import { useEffect } from "react";
import { Helmet } from "react-helmet";

import styled from "styled-components";

import FooterMobile from "@components/frontside/mobile/Footer";
import DetailMobile from "@components/frontside/mobile/bookmarkDetail/Detail";
import NavbarMobile from "@components/frontside/mobile/navbar/Navbar";
import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import DetailTablet from "@components/frontside/tablet/bookmarkDetail/Detail";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import BookmarkService from "@services/frontside/BookmarkService";
import StorySearchService from "@services/frontside/StorySearchService";
import WidgetOnPageService from "@services/frontside/WidgetOnPageService";
import { getResponsive } from "@utils/Hooks";

export default function Bookmark() {
  // console.log("In Bookmark");
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

  const helmetElement = (
    <Helmet>
      <title>Luna: บุ๊กมาร์ก</title>
      <meta name="description" content="อ่านการ์ตูนออนไลน์ อ่านการ์ตูนแปลไทย อ่านมังงะ อ่านนิยาย" />
      <meta name="keywords" content="บุ๊กมาร์ก มังงะ นิยาย" />
    </Helmet>
  );

  if (responsive === ResponsiveEnum.MOBILE) {
    return (
      <Box>
        {helmetElement}
        <NavbarMobile />
        <DetailMobile />
        <FooterMobile isShow={isFooterShow} />
      </Box>
    );
  }

  return (
    <>
      <Box>
        {helmetElement}
        <NavbarTablet />
        <DetailTablet />
        <FooterTablet isShow={isFooterShow} />
      </Box>
      <GoTopButtonTablet />
    </>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100lvh;

  display: flex;
  flex-direction: column;
`;
