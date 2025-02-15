import React from "react";

import styled from "styled-components";

import BoxLoading from "@components/tablet/BoxLoading";
import WidgetItem from "@components/tablet/WidgetItem";
import ChapterContent from "@components/tablet/chapterDetail/ChapterContent";
import ChapterReactionVote from "@components/tablet/chapterDetail/ChapterReactionVote";
import ForceSigninModal from "@components/tablet/chapterDetail/ForceSigninModal";
import ChapterComment from "@components/tablet/chapterDetail/comment/ChapterComment";
import { WidgetTypeEnum } from "@enums/WidgetTypeEnum";
import AuthService from "@services/AuthService";
import ChapterCommentService from "@services/ChapterCommentService";
import ChapterService from "@services/ChapterService";
import WidgetOnPageService from "@services/WidgetOnPageService";
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
      {isLoggedIn == false ? <ForceSigninModal /> : <ChapterContent />}
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
