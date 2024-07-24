import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/categoryDetail/FooterControl";
import InputImage from "@components/backoffice/categoryForm/InputImage";
import InputName from "@components/backoffice/categoryForm/InputName";
import InputStatus from "@components/backoffice/categoryForm/InputStatus";
import InputType from "@components/backoffice/categoryForm/InputType";
import CategoryService from "@services/backoffice/CategoryService";

export default function Detail() {
  const category = CategoryService.getCategory();

  if (category == null) {
    return (
      <Box>
        <Header headerTitle="Category Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="Category Detail" />
      <Content>
        <InputImage initial={category.images[0]} />
        <InputName initial={category.name} />
        <InputType initial={category.type} />
        <InputStatus initial={category.status} />
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
