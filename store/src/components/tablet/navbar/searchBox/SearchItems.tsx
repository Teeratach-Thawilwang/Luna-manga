import styled from "styled-components";

import SearchItemDisplayText from "@components/tablet/navbar/searchBox/SearchItemDisplayText";
import StorySearchItem from "@components/tablet/navbar/searchBox/StorySearchItem";
import { StorySearchInterface } from "@interfaces/StorySearchInterface";
import StorySearchService from "@services/StorySearchService";
import { box } from "@utils/Themes";

export default function SearchItems() {
  const isLoading = StorySearchService.getStorySearchIsLoading();
  const storySearchItems = StorySearchService.getStorySearch();
  const isModalShow = StorySearchService.getIsModalShow();

  if (isLoading) {
    return (
      <Box $isShow={isModalShow}>
        <SearchItemDisplayText text="กำลังค้นหา . . ." onClick={() => StorySearchService.clearState()} />
      </Box>
    );
  }

  if (storySearchItems.length == 0) {
    return (
      <Box $isShow={isModalShow}>
        <SearchItemDisplayText text="ไม่พบเรื่องที่คุณค้นหาอยู่" onClick={() => StorySearchService.clearState()} />
      </Box>
    );
  }

  const element = createStorySearchItems(storySearchItems);
  return <Box $isShow={isModalShow}>{element}</Box>;
}

const Box = styled.div<{ $isShow: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-width: 700px;
  max-width: 800px;

  display: ${(props) => (props.$isShow ? "block" : "none")};

  position: absolute;
  top: 89px;
  left: 50%;
  transform: translateX(-50%);

  z-index: ${(props) => box(props).zIndex.dropdown};
`;

function createStorySearchItems(stories: StorySearchInterface[]) {
  return stories.map((story) => {
    return <StorySearchItem story={story} key={story.id} />;
  });
}
