import styled from "styled-components";

import SignInSignUpForm from "@components/frontside/tablet/navbar/signInSignUpForm/SignInSignUpForm";
import SignInIcon from "@components/iconSvg/SignInIcon";
import SignInSignUpService from "@services/frontside/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

export default function SignInButton() {
  return (
    <>
      <Box onClick={() => SignInSignUpService.setIsShow(true)}>
        <SignInIconBox>
          <SignInIcon />
        </SignInIconBox>
        <Text>เข้าสู่ระบบ</Text>
      </Box>
      <SignInSignUpForm />
    </>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;

    div {
      color: ${(props) => color(props).onSurfaceVariant};
    }

    path {
      stroke: ${(props) => color(props).onSurfaceVariant};

      &:last-child {
        fill: ${(props) => color(props).onSurfaceVariant};
      }
    }
  }
`;

const SignInIconBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size.md};
    height: ${(props) => font(props).size.md};
    padding: ${(props) => box(props).space.xs} ${(props) => box(props).space.xs};

    path {
      stroke: ${(props) => color(props).onSurface};

      &:last-child {
        fill: ${(props) => color(props).onSurface};
      }
    }
  }
`;

const Text = styled.div`
  /* border: 1px solid red; */
  margin-left: 7px;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};
  white-space: nowrap;
`;
