import styled from "styled-components";

import InputText from "@components/tablet/resetPassword/InputText";
import ResetPasswordButton from "@components/tablet/resetPassword/ResetPasswordButton";
import ResetPasswordErrorMessage from "@components/tablet/resetPassword/ResetPasswordErrorMessage";
import { box, color, font } from "@utils/Themes";

export default function Detail() {
  return (
    <Box>
      <Card>
        <Title>Reset Password</Title>
        <InputText type="password" name="password" placeholder="รหัสผ่าน" />
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
  margin: ${(props) => box(props).space.xxl} 0;
  padding: 0 10px;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Card = styled.form`
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  padding: ${(props) => box(props).space.lg};

  border-radius: ${(props) => box(props).borderRadius.md};
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
  margin-bottom: ${(props) => box(props).space.sm};

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};
  text-align: center;
`;
