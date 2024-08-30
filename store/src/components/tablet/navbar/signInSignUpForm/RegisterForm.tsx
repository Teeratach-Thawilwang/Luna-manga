import styled from "styled-components";

import InputText from "@components/tablet/navbar/signInSignUpForm/InputText";
import RegisterButton from "@components/tablet/navbar/signInSignUpForm/RegisterButton";
import RegisterErrorMessage from "@components/tablet/navbar/signInSignUpForm/RegisterErrorMessage";
import { box } from "@utils/Themes";

export default function RegisterForm() {
  return (
    <Box>
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
  margin: 0;
  padding: 0 ${(props) => box(props).space.md};
`;
