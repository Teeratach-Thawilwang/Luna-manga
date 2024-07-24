import styled from "styled-components";

import Header from "@components/backoffice/Header";
import FooterControl from "@components/backoffice/categoryCreate/FooterControl";
import InputImage from "@components/backoffice/categoryForm/InputImage";
import InputName from "@components/backoffice/categoryForm/InputName";
import InputStatus from "@components/backoffice/categoryForm/InputStatus";
import InputType from "@components/backoffice/categoryForm/InputType";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Category Create" />
      <Content>
        <InputImage />
        <InputName />
        <InputType />
        <InputStatus />
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
