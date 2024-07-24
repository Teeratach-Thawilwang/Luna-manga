import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/userDetail/FooterControl";
import InputEmail from "@components/backoffice/userForm/InputEmail";
import InputFirstName from "@components/backoffice/userForm/InputFirstName";
import InputLastName from "@components/backoffice/userForm/InputLastName";
import InputNickName from "@components/backoffice/userForm/InputNickName";
import InputPassword from "@components/backoffice/userForm/InputPassword";
import InputStatus from "@components/backoffice/userForm/InputStatus";
import UserService from "@services/backoffice/UserService";

export default function Detail() {
  const user = UserService.getUser();

  if (user == null) {
    return (
      <Box>
        <Header headerTitle="User Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="User Detail" />
      <Content>
        <InputEmail initial={user.email} />
        <InputFirstName initial={user.first_name} />
        <InputLastName initial={user.last_name} />
        <InputNickName initial={user.nick_name} />
        <InputPassword initial={"************"} />
        <InputStatus initial={user.status} />
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
