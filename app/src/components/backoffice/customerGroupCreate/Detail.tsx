import styled from "styled-components";

import Header from "@components/backoffice/Header";
import FooterControl from "@components/backoffice/customerGroupCreate/FooterControl";
import InputName from "@components/backoffice/customerGroupForm/InputName";
import InputStatus from "@components/backoffice/customerGroupForm/InputStatus";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="Customer Group Detail" />
      <Content>
        <InputName />
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
