import { useParams } from "react-router-dom";

import styled from "styled-components";

import Header from "@components/backoffice/Header";
import FooterControl from "@components/backoffice/storyCreate/FooterControl";
import InputCategories from "@components/backoffice/storyForm/InputCategories";
import InputCoverImage from "@components/backoffice/storyForm/InputCoverImage";
import InputDescription from "@components/backoffice/storyForm/InputDescription";
import InputName from "@components/backoffice/storyForm/InputName";
import InputSlug from "@components/backoffice/storyForm/InputSlug";
import InputStatus from "@components/backoffice/storyForm/InputStatus";
import InputType from "@components/backoffice/storyForm/InputType";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";

export default function Detail({ title }: { title: string }) {
  const { type } = useParams();
  return (
    <Box>
      <Header headerTitle={`${title} Create`} />
      <Content>
        <InputCoverImage />
        <InputName />
        <InputSlug />
        <InputType initial={type as CategoryTypeEnum} />
        <InputStatus />
        <InputDescription />
        <InputCategories />
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
