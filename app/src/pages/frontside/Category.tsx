import { useEffect } from "react";

import styled from "styled-components";

import FooterMobile from "@components/frontside/mobile/Footer";
import DetailMobile from "@components/frontside/mobile/categoryDetail/Detail";
import NavbarMobile from "@components/frontside/mobile/navbar/Navbar";
import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import DetailTablet from "@components/frontside/tablet/categoryDetail/Detail";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import CategoryService from "@services/frontside/CategoryService";
import CategoryStoryService from "@services/frontside/CategoryStoryService";
import StorySearchService from "@services/frontside/StorySearchService";
import WidgetOnPageService from "@services/frontside/WidgetOnPageService";
import { getResponsive } from "@utils/Hooks";

export default function Category() {
  // console.log("In Category");
  document.title = "Luna: Category";
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
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100lvh;

  display: flex;
  flex-direction: column;
`;
