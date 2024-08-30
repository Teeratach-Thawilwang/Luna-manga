import styled from "styled-components";

import Logo from "@components/mobile/Logo";
import InputText from "@components/mobile/resetPassword/InputText";
import ResetPasswordButton from "@components/mobile/resetPassword/ResetPasswordButton";
import ResetPasswordErrorMessage from "@components/mobile/resetPassword/ResetPasswordErrorMessage";
import { box, color, font } from "@utils/Themes";

export default function Detail() {
  return (
    <Box>
      <LogoBox>
        <Logo />
      </LogoBox>
      <Card>
        <Title>เปลี่ยนรหัสผ่าน</Title>
        <InputText type="password" name="password" placeholder="รหัสผ่านใหม่" />
        <InputText type="password" name="confirmPassword" placeholder="ยืนยันรหัสผ่าน" />
        <ResetPasswordErrorMessage />
        <ResetPasswordButton />
      </Card>
    </Box>
  );
}

const Box = styled.div`
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
`;

const LogoBox = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
`;

const Card = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  padding: ${(props) => box(props).space.lg};

  border-radius: ${(props) => box(props).borderRadius["2xl"]};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  width: 100%;

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};
  line-height: ${(props) => font(props).lineHeight.md};
  text-align: center;
`;
