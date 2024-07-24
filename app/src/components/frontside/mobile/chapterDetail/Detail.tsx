import React from "react";

import styled from "styled-components";

import BoxLoading from "@components/frontside/mobile/BoxLoading";
import Logo from "@components/frontside/mobile/Logo";
import WidgetItem from "@components/frontside/mobile/WidgetItem";
import ChapterContent from "@components/frontside/mobile/chapterDetail/ChapterContent";
import ChapterReactionVote from "@components/frontside/mobile/chapterDetail/ChapterReactionVote";
import ChapterComment from "@components/frontside/mobile/chapterDetail/comment/ChapterComment";
import { WidgetTypeEnum } from "@enums/frontside/WidgetTypeEnum";
import AuthService from "@services/frontside/AuthService";
import ChapterCommentService from "@services/frontside/ChapterCommentService";
import ChapterService from "@services/frontside/ChapterService";
import WidgetOnPageService from "@services/frontside/WidgetOnPageService";
import { box } from "@utils/Themes";

export default React.memo(function Detail() {
  const isChapterLoading = !ChapterService.getChapterIsLoaded();
  const isWidgetOnPageLoading = !WidgetOnPageService.getIsLoaded();
  const isCommentLoaded = ChapterCommentService.getCommentIsLoaded();
  const isLoggedIn = AuthService.isLogin();

  if (isChapterLoading || isWidgetOnPageLoading) {
    return (
      <Box>
        <BoxLoading />
      </Box>
    );
  }
  return (
    <Box>
      <Logo />
      <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_GROUP} />
      <ChapterContent />
      {isLoggedIn == true ? <ChapterReactionVote /> : null}
      <WidgetItem type={WidgetTypeEnum.STORY_LIST} />
      {isCommentLoaded == true ? <ChapterComment /> : null}
      <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_MEDIUM} />
      <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_SMALL} />
      <WidgetItem type={WidgetTypeEnum.STORY_WINDOW} />
    </Box>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: 0;
  margin-bottom: ${(props) => box(props).space.xxl};
  padding: 0 5px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;
