import { MutableRefObject, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";

import StoryChapterPagination from "@components/tablet/storyDetail/StoryChapterPagination";
import StoryReactionVote from "@components/tablet/storyDetail/StoryReactionVote";
import StoryChapterList from "@components/tablet/storyDetail/storyChapterItem/StoryChapterList";
import AuthService from "@services/AuthService";
import StoryChapterService from "@services/StoryChapterService";
import { box } from "@utils/Themes";

export default function StoryChapterContent() {
  // console.log("In StoryChapter");
  const { slug } = useParams();
  const navigate = useNavigate();
  const chapters = StoryChapterService.getStoryChapter();
  const isLoading = StoryChapterService.getIsLoading();
  const isLoggedIn = AuthService.isLogin();
  const headerElementRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  if (chapters.length === 0) {
    return <Box></Box>;
  }

  function navigatePagination(page: number) {
    const storyHeaderTitleRef = headerElementRef.current?.previousElementSibling?.children[1]! as HTMLElement;
    storyHeaderTitleRef.scrollIntoView({ block: "start", behavior: "smooth" });
    navigate(`/story/${slug}?page=${page}`);
  }

  return (
    <Box ref={headerElementRef}>
      <Content $isLoading={isLoading}>
        <StoryChapterList />
        <StoryChapterPagination navigatePagination={navigatePagination} />
        {isLoggedIn == true ? <StoryReactionVote /> : null}
      </Content>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  margin-top: ${(props) => box(props).space.md};

  position: relative;
`;

const Content = styled.div<{ $isLoading: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;

  opacity: ${(props) => (props.$isLoading ? 0.5 : 1)};
`;
