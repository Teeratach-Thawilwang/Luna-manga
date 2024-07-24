import styled from "styled-components";

import InputEmail from "@components/backoffice/login/InputEmail";
import InputPassword from "@components/backoffice/login/InputPassword";
import LoginButton from "@components/backoffice/login/LoginButton";
import LoginErrorMessage from "@components/backoffice/login/LoginErrorMessage";

export default function Detail() {
  return (
    <Box>
      <Container>
        <HeaderForm>Luna</HeaderForm>
        <InputEmail />
        <InputPassword />
        <LoginErrorMessage />
        <LoginButton />
      </Container>
    </Box>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.form`
  box-sizing: border-box;
  width: 325px;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.55);
`;

const HeaderForm = styled.div`
  /* border: 1px solid green; */
  box-sizing: border-box;
  width: 100%;
  height: 45px;
  margin: 25px 0 20px 0;

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  font-size: 50px;
  font-family: Berkshire Swash;
  font-weight: normal;
  background: linear-gradient(to bottom right, #2e2774, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
