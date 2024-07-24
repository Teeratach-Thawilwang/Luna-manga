import { useParams } from "react-router-dom";

import styled from "styled-components";

import Header from "@components/backoffice/Header";
import FooterControl from "@components/backoffice/chapterCreate/FooterControl";
import InputChapterNumber from "@components/backoffice/chapterForm/InputChapterNumber";
import InputCoverImage from "@components/backoffice/chapterForm/InputCoverImage";
import InputImageEditor from "@components/backoffice/chapterForm/InputImageEditor";
import InputName from "@components/backoffice/chapterForm/InputName";
import InputStatus from "@components/backoffice/chapterForm/InputStatus";
import InputStory from "@components/backoffice/chapterForm/InputStory";
import InputText from "@components/backoffice/chapterForm/InputText";
import InputType from "@components/backoffice/chapterForm/InputType";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";

export default function Detail() {
  const { type } = useParams();
  let editorElement = getEditorElement(type);

  return (
    <Box>
      <Header headerTitle="Chapter Create" />
      <Content>
        <InputCoverImage />
        <InputName />
        <InputChapterNumber />
        <InputType initial={type as CategoryTypeEnum} />
        <InputStatus />
        <InputStory />
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

function getEditorElement(type: string | undefined) {
  if (type == CategoryTypeEnum.MANGA) {
    return <InputImageEditor />;
  }

  if (type == CategoryTypeEnum.NOVEL) {
    return <InputText />;
  }

  return null;
}
