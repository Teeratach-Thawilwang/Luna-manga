import { Suspense, lazy, useEffect } from "react";

import styled from "styled-components";

import FooterMobile from "@components/mobile/Footer";
import DetailMobile from "@components/mobile/categoryDetail/Detail";
import NavbarMobile from "@components/mobile/navbar/Navbar";
import { CategoryTypeEnum } from "@enums/CategoryTypeEnum";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import CategoryService from "@services/CategoryService";
import CategoryStoryService from "@services/CategoryStoryService";
import StorySearchService from "@services/StorySearchService";
import WidgetOnPageService from "@services/WidgetOnPageService";
import { getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const DetailTablet = lazy(() => import("@components/tablet/categoryDetail/Detail"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));

export default function Category() {
  // console.log("In Category");
  document.title = "Luna: หมวดหมู่";
  const responsive = getResponsive();
  const categories = CategoryService.getCategory();
  const isCategoryLoaded = CategoryService.getIsLoaded();
  const isStoryLoaded = CategoryStoryService.getIsLoaded();
  const isWidgetOnPageLoaded = WidgetOnPageService.getIsLoaded();
  const isFooterShow = isStoryLoaded && isCategoryLoaded;

  useEffect(() => {
    if (isCategoryLoaded == false) {
      CategoryService.loadIndex();
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    if (isWidgetOnPageLoaded == false) {
      WidgetOnPageService.loadWidgetOnPage();
    }

    return () => {
      StorySearchService.clearState();
    };
  }, []);

  useEffect(() => {
    if (isStoryLoaded == false && isCategoryLoaded == true) {
      const categoryAll = categories.filter((category) => {
        return category.name == "ทั้งหมด" && category.type == CategoryTypeEnum.MANGA;
      });
      const categorySelectedId = categoryAll.length == 0 ? categories[0].id : categoryAll[0].id;
      CategoryStoryService.loadIndex(categorySelectedId, 1, 15, "name");
    }
  }, [isCategoryLoaded]);

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
