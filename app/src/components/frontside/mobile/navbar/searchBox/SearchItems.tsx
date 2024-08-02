import styled from "styled-components";

import SearchNotFound from "@components/frontside/mobile/navbar/searchBox/SearchNotFound";
import Searching from "@components/frontside/mobile/navbar/searchBox/Searching";
import StorySearchItem from "@components/frontside/mobile/navbar/searchBox/StorySearchItem";
import { NavigationModelEnum } from "@enums/frontside/NavigationModelEnum";
import { StorySearchInterface } from "@interfaces/frontside/StorySearchInterface";
import StorySearchService from "@services/frontside/StorySearchService";
import { box } from "@utils/Themes";

interface SearchItemsInterface {
  setActive: (value: NavigationModelEnum) => void;
}

export default function SearchItems({ setActive }: SearchItemsInterface) {
  const isLoading = StorySearchService.getStorySearchIsLoading();
  const storySearchItems = StorySearchService.getStorySearch();
  const isModalShow = StorySearchService.getSearchQuery() != "";

  if (isLoading) {
    return <Searching />;
  }

  if (storySearchItems.length == 0) {
    return (
      <Box $isShow={isModalShow}>
        <SearchNotFound text="ไม่พบเรื่องที่คุณค้นหาอยู่" />
      </Box>
    );
  }

  const element = createStorySearchItems(storySearchItems, setActive);
  return <Box $isShow={isModalShow}>{element}</Box>;
}

const Box = styled.div<{ $isShow: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.md};

  display: ${(props) => (props.$isShow ? "block" : "none")};
`;

function createStorySearchItems(stories: StorySearchInterface[], setActive: (value: NavigationModelEnum) => void) {
  return stories.map((story) => {
    return <StorySearchItem story={story} setActive={setActive} key={story.id} />;
  });
}
