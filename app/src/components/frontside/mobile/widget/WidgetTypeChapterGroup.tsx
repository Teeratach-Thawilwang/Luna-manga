import { MutableRefObject, useRef } from "react";

import styled from "styled-components";

import PaginationTab from "@components/frontside/mobile/PaginationTab";
import BannerTypeChapter from "@components/frontside/mobile/banner/BannerTypeChapter";
import { WidgetInterface } from "@interfaces/frontside/WidgetInterface";
import WidgetService from "@services/frontside/WidgetService";
import { box, color, font } from "@utils/Themes";

export default function WidgetTypeChapterGroup(widget: WidgetInterface) {
  // console.log("In WidgetTypeChapterGroup");
  const headerElementRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const isLoading = WidgetService.getIsLoadingById(widget.id);
  const paginate = WidgetService.getPaginateById(widget.id);
  const chapterBanners = createChapterBanner(widget, isLoading ?? false);

  function navigatePagination(page: number) {
    WidgetService.loadWidgetBanners(widget.id, page);
    headerElementRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const paginateProps = {
    ...paginate!,
    navigatePagination,
  };

  return (
    <Box>
      <Header ref={headerElementRef}>{widget.title}</Header>
      <Container>{chapterBanners}</Container>
      <BoxPagination>
        <PaginationTab {...paginateProps} />
      </BoxPagination>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin-top: ${(props) => box(props).space.xxl};
`;

const Header = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: fit-content;
  padding: 5px 0 5px 3px;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: start;
  align-items: center;
`;

const Container = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.sm};

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${(props) => box(props).space.md} 0px;
`;

const BoxPagination = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.lg};
  padding: 0 5px;
`;

function createChapterBanner(widget: WidgetInterface, isLoading: boolean) {
  return widget.banners?.map((banner) => {
    return <BannerTypeChapter {...{ banner: banner, isLoading: isLoading }} key={banner.id} />;
  });
}
