import React, { Suspense, lazy, useEffect, useRef } from "react";

import styled from "styled-components";

import FooterMobile from "@components/mobile/Footer";
import NavbarMobile from "@components/mobile/navbar/Navbar";
import DetailMobile from "@components/mobile/widget/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import StorySearchService from "@services/StorySearchService";
import WidgetService from "@services/WidgetService";
import { addEventScroll, getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));
const DetailTablet = lazy(() => import("@components/tablet/widget/Detail"));

export default React.memo(function Home() {
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
      <Suspense fallback={<Box />}>
        <Box>
          <NavbarMobile />
          <DetailMobile />
          <div ref={footerRef}></div>
          <FooterMobile isShow={!isLoading} />
        </Box>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Box />}>
      <Box>
        <NavbarTablet />
        <DetailTablet />
        <div ref={footerRef}></div>
        <FooterTablet isShow={!isLoading} />
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
