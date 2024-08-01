import React, { useEffect, useRef } from "react";

import styled from "styled-components";

import FooterMobile from "@components/frontside/mobile/Footer";
import NavbarMobile from "@components/frontside/mobile/navbar/Navbar";
import DetailMobile from "@components/frontside/mobile/widget/Detail";
import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import DetailTablet from "@components/frontside/tablet/widget/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import StorySearchService from "@services/frontside/StorySearchService";
import WidgetService from "@services/frontside/WidgetService";
import { addEventScroll, getResponsive } from "@utils/Hooks";

export default React.memo(function Home() {
  // console.log("In Home");
  document.title = "Luna";
  const responsive = getResponsive();
  const footerRef = useRef<HTMLDivElement | null>(null);

  const currentPage = WidgetService.getCurrentPage();
  const lastPage = WidgetService.getLastPage() ?? 0;
  const isLoading = WidgetService.getIsLoading();
  const isLoaded = WidgetService.getIsLoaded();

  useEffect(() => {
    if (isLoaded == false) {
      WidgetService.loadIndex(currentPage);
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    return () => {
      StorySearchService.clearState();
    };
  }, []);

  addEventScroll(() => {
    const currentScrollY = footerRef.current?.getBoundingClientRect().bottom;
    const isReachBottom = currentScrollY! <= window.innerHeight + 80;
    const isLoadable = currentPage < lastPage && isLoading == false;
    if (isReachBottom && isLoadable) {
      WidgetService.loadIndex(currentPage + 1);
    }
  }, [lastPage, isLoading, footerRef]);

  if (responsive === ResponsiveEnum.MOBILE) {
    return (
      <Box>
        <NavbarMobile />
        <DetailMobile />
        <div ref={footerRef}></div>
        <FooterMobile isShow={!isLoading} />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <NavbarTablet />
        <DetailTablet />
        <div ref={footerRef}></div>
        <FooterTablet isShow={!isLoading} />
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
