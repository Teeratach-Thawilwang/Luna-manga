import React from "react";

import styled from "styled-components";

import BoxLoading from "@components/mobile/BoxLoading";
import Logo from "@components/mobile/Logo";
import WidgetItem from "@components/mobile/WidgetItem";
import ChapterContent from "@components/mobile/chapterDetail/ChapterContent";
import ChapterReactionVote from "@components/mobile/chapterDetail/ChapterReactionVote";
import ForceSigninModal from "@components/mobile/chapterDetail/ForceSigninModal";
import ChapterComment from "@components/mobile/chapterDetail/comment/ChapterComment";
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
    <>
      <Box>
        <Logo />
        <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_GROUP} />
      </Box>
      {isLoggedIn == false ? <ForceSigninModal /> : <ChapterContent />}
      <BoxBottom>
        {isLoggedIn == true ? <ChapterReactionVote /> : null}
        <WidgetItem type={WidgetTypeEnum.STORY_LIST} />
        {isCommentLoaded == true ? <ChapterComment /> : null}
        <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_MEDIUM} />
        <WidgetItem type={WidgetTypeEnum.ADVERTISEMENT_SMALL} />
        <WidgetItem type={WidgetTypeEnum.STORY_WINDOW} />
      </BoxBottom>
    </>
  );
});

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: 0;
  padding: 0 5px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const BoxBottom = styled.div`
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
