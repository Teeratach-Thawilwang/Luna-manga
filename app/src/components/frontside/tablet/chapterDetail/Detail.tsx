import React from "react";

import styled from "styled-components";

import BoxLoading from "@components/frontside/tablet/BoxLoading";
import WidgetItem from "@components/frontside/tablet/WidgetItem";
import ChapterContent from "@components/frontside/tablet/chapterDetail/ChapterContent";
import ChapterReactionVote from "@components/frontside/tablet/chapterDetail/ChapterReactionVote";
import ChapterComment from "@components/frontside/tablet/chapterDetail/comment/ChapterComment";
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
  margin: ${(props) => box(props).space.xxl} 0;
  padding: 0 10px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;
