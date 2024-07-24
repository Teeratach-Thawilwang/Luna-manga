import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/chapterDetail/FooterControl";
import InputChapterNumber from "@components/backoffice/chapterForm/InputChapterNumber";
import InputCoverImage from "@components/backoffice/chapterForm/InputCoverImage";
import InputImageEditor from "@components/backoffice/chapterForm/InputImageEditor";
import InputName from "@components/backoffice/chapterForm/InputName";
import InputStatus from "@components/backoffice/chapterForm/InputStatus";
import InputStory from "@components/backoffice/chapterForm/InputStory";
import InputText from "@components/backoffice/chapterForm/InputText";
import InputType from "@components/backoffice/chapterForm/InputType";
import { ImageResponsiveEnum } from "@enums/ImageResponsiveEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { ChapterInterface } from "@interfaces/backoffice/ChapterInterface";
import ChapterService from "@services/backoffice/ChapterService";

export default function Detail() {
  const chapter = ChapterService.getChapter();

  if (chapter == null) {
    return (
      <Box>
        <Header headerTitle="Chapter Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  let editorElement = getEditorElement(chapter.type, chapter);

  return (
    <Box>
      <Header headerTitle="Chapter Detail" />
      <Content>
        <InputCoverImage initial={chapter.cover_image[0]} />
        <InputName initial={chapter.name} />
        <InputChapterNumber initial={chapter.chapter_number} />
        <InputType initial={chapter.type} />
        <InputStatus initial={chapter.status} />
        <InputStory initial={chapter.story} />
        {editorElement}
      </Content>
      <Space />
      <FooterControl />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-width: 750px;

  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  flex-grow: 1;
  /* min-height: calc(100vh - 60px - 150px); */

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* min-width: 750px; */

  margin: 20px 20px 20px 20px;
`;

const Space = styled.div`
  flex-grow: 1;
  margin: auto 0 auto 0;
`;

function getEditorElement(type: CategoryTypeEnum, chapter: ChapterInterface) {
  const initial = ChapterService.transformTextToEditor(chapter.text, chapter.images, chapter.audio, ImageResponsiveEnum.THUMBNAIL);
  switch (type) {
    case CategoryTypeEnum.NOVEL:
      return <InputText initial={initial} />;
    case CategoryTypeEnum.MANGA:
      return <InputImageEditor initial={initial} />;
    default:
      return null;
  }
}
