import styled from "styled-components";

import CenterModal from "@components/frontside/tablet/CenterModal";
import BodyForm from "@components/frontside/tablet/navbar/signInSignUpForm/BodyForm";
import HeaderForm from "@components/frontside/tablet/navbar/signInSignUpForm/header/HeaderForm";
import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { box, color } from "@utils/Themes";

export default function SignInSignUpForm() {
  const isShow = SignInSignUpService.getter<boolean>("isShow");

  function setIsShow(value: boolean) {
    SignInSignUpService.setIsShow(value);
  }

  return (
    <CenterModal isShow={isShow} setShow={setIsShow}>
      <Box>
        <HeaderForm />
        <BodyForm />
      </Box>
    </CenterModal>
  );
}

const Box = styled.div`
  border: 1px solid red;
  box-sizing: border-box;
  width: 325px;
  padding: ${(props) => box(props).space.md} 0 ${(props) => box(props).space.md} 0;

  border-radius: 6px;
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};
`;
