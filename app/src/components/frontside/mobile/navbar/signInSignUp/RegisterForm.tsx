import styled from "styled-components";

import InputText from "@components/frontside/mobile/navbar/signInSignUp/InputText";
import LogoWithBackButton from "@components/frontside/mobile/navbar/signInSignUp/LogoWithBackButton";
import RegisterButton from "@components/frontside/mobile/navbar/signInSignUp/RegisterButton";
import RegisterErrorMessage from "@components/frontside/mobile/navbar/signInSignUp/RegisterErrorMessage";
import { box } from "@utils/Themes";

export default function RegisterForm() {
  return (
    <Box>
      <LogoWithBackButton />
      <InputText type="email" name="email" placeholder="อีเมล" />
      <InputText type="text" name="firstName" placeholder="ชื่อ" />
      <InputText type="text" name="lastName" placeholder="นามสกุล" />
      <InputText type="text" name="nickName" placeholder="ชื่อเล่น" />
      <InputText type="password" name="password" placeholder="รหัสผ่าน" />
      <InputText type="password" name="confirmPassword" placeholder="ยืนยันรหัสผ่าน" />
      <RegisterErrorMessage />
      <RegisterButton />
    </Box>
  );
}

const Box = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin: 0;
  padding: ${(props) => box(props).space.md};

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
