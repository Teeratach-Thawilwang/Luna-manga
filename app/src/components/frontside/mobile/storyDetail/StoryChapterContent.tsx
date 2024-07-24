import { MutableRefObject, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";

import StoryChapterPagination from "@components/frontside/mobile/storyDetail/StoryChapterPagination";
import StoryReactionVote from "@components/frontside/mobile/storyDetail/StoryReactionVote";
import StoryChapterList from "@components/frontside/mobile/storyDetail/storyChapterItem/StoryChapterList";
import AuthService from "@services/frontside/AuthService";
import StoryChapterService from "@services/frontside/StoryChapterService";
import { box } from "@utils/Themes";

export default function StoryChapterContent() {
  // console.log("In StoryChapter");
  const { slug } = useParams();
  const navigate = useNavigate();
  const chapters = StoryChapterService.getStoryChapter();
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
      <Content>
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
  margin-top: ${(props) => box(props).space.md};

  position: relative;
`;

const Content = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
`;
