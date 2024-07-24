import { MutableRefObject } from "react";

import styled from "styled-components";

import BoxLoading from "@components/frontside/mobile/BoxLoading";
import PaginationTab from "@components/frontside/mobile/PaginationTab";
import StoryItem from "@components/frontside/mobile/categoryDetail/StoryItem";
import { CategoryStoryInterface } from "@interfaces/frontside/CategoryStoryInterface";
import { PaginationInterface } from "@interfaces/frontside/PaginationInterface";
import CategoryStoryService from "@services/frontside/CategoryStoryService";
import { box } from "@utils/Themes";

export default function CategeryContent({ contentRef }: { contentRef: MutableRefObject<HTMLDivElement | null> }) {
  const stories = CategoryStoryService.getStory();
  const isStoryLoading = !CategoryStoryService.getIsLoaded();
  const paginate = CategoryStoryService.getPaginate();
  const categorySelectedId = CategoryStoryService.getCategorySelectedId();
  const storyElement = createStoryElement(stories);
  const paginateElement = createPagination(stories.length, categorySelectedId, paginate, contentRef);
  const boxLoadingElement = createBoxLoading(isStoryLoading);

  return (
    <Box>
      <Container>{storyElement}</Container>
      {paginateElement}
      {boxLoadingElement}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;

  margin-top: ${(props) => box(props).space.md};
`;

const BoxLoadingWrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  width: 100%;
  min-height: 300px;

  position: relative;
`;

const Container = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

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

function createStoryElement(stories: CategoryStoryInterface[]) {
  return stories.map((story) => {
    return <StoryItem {...story} key={story.id} />;
  });
}

function createPagination(
  storyLength: number,
  categorySelectedId: number | null,
  paginate: PaginationInterface | null,
  contentRef: MutableRefObject<HTMLDivElement | null>,
) {
  function navigatePagination(page: number) {
    if (categorySelectedId != null) {
      CategoryStoryService.loadIndex(categorySelectedId, page);
      contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const paginateProps = {
    ...paginate!,
    navigatePagination,
  };

  return storyLength != 0 ? (
    <BoxPagination>
      <PaginationTab {...paginateProps} />
    </BoxPagination>
  ) : null;
}

function createBoxLoading(isLoading: boolean) {
  if (!isLoading) {
    return null;
  }
  return (
    <BoxLoadingWrap>
      <BoxLoading />
    </BoxLoadingWrap>
  );
}
