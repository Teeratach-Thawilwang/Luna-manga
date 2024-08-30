import styled from "styled-components";

import PaginationTab from "@components/tablet/PaginationTab";
import StoryChapterService from "@services/StoryChapterService";
import { box } from "@utils/Themes";

export default function StoryChapterPagination({ navigatePagination }: { navigatePagination: (page: number) => void }) {
  const paginate = StoryChapterService.getStoryChapterPaginate();

  if (paginate == null) {
    return <></>;
  }

  const paginateProps = {
    ...paginate,
    navigatePagination,
  };

  return (
    <BoxPagination>
      <PaginationTab {...paginateProps} />
    </BoxPagination>
  );
}

const BoxPagination = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: ${(props) => box(props).space.md};
`;
