import { MutableRefObject, useRef } from "react";

import styled from "styled-components";

import PaginationTab from "@components/mobile/PaginationTab";
import BookmarkStory from "@components/mobile/bookmarkDetail/bookmarkStory/BookmarkStory";
import { BookmarkStoryInterface } from "@interfaces/BookmarkInterface";
import { PaginationInterface } from "@interfaces/PaginationInterface";
import BookmarkService from "@services/BookmarkService";
import { box } from "@utils/Themes";

export default function BookmarkContent() {
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const bookmark = BookmarkService.getBookmark();
  const paginate = BookmarkService.getPaginate();
  const storyElement = createBookmarkStory(bookmark);
  const paginateElement = createPagination(bookmark, paginate, contentRef);

  return (
    <Box ref={contentRef}>
      <Container>{storyElement}</Container>
      {paginateElement}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;

  position: relative;
`;

const Container = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
`;

const BoxPagination = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.lg};
  padding: 0 5px;
`;

function createBookmarkStory(bookmark: BookmarkStoryInterface[]) {
  return bookmark.map((story) => {
    return <BookmarkStory story={story} key={story.id} />;
  });
}

function createPagination(
  bookmark: BookmarkStoryInterface[],
  paginate: PaginationInterface | null,
  contentRef: MutableRefObject<HTMLDivElement | null>,
) {
  function navigatePagination(page: number) {
    BookmarkService.loadIndex(page);
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const paginateProps = {
    ...paginate!,
    navigatePagination,
  };

  return bookmark.length != 0 ? (
    <BoxPagination>
      <PaginationTab {...paginateProps} />
    </BoxPagination>
  ) : null;
}
