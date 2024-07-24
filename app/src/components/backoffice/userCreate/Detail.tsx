import styled from "styled-components";

import Header from "@components/backoffice/Header";
import FooterControl from "@components/backoffice/userCreate/FooterControl";
import InputEmail from "@components/backoffice/userForm/InputEmail";
import InputFirstName from "@components/backoffice/userForm/InputFirstName";
import InputLastName from "@components/backoffice/userForm/InputLastName";
import InputNickName from "@components/backoffice/userForm/InputNickName";
import InputPassword from "@components/backoffice/userForm/InputPassword";
import InputStatus from "@components/backoffice/userForm/InputStatus";

export default function Detail() {
  return (
    <Box>
      <Header headerTitle="User Create" />
      <Content>
        <InputEmail />
        <InputFirstName />
        <InputLastName />
        <InputNickName />
        <InputPassword />
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
