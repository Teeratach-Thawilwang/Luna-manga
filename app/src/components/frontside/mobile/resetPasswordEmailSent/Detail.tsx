import styled from "styled-components";

import Logo from "@components/frontside/mobile/Logo";
import EmailIcon from "@components/iconSvg/EmailIcon";
import { box, color, font } from "@utils/Themes";

export default function Detail() {
  return (
    <Box>
      <LogoBox>
        <Logo />
      </LogoBox>
      <Card>
        <IconBox>
          <EmailIcon />
        </IconBox>
        <Title>Reset Password.</Title>
        <Text>ระบบกำลังส่งลิงค์เพื่อกำหนดรหัสผ่านใหม่ไปยังอีเมลของคุณ</Text>
        <Text>หากไม่พบอีเมล กรุณาตรวจสอบในถังขยะหรือจดหมายขยะ</Text>
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

const IconBox = styled.div`
  border: 1px solid red;
  box-sizing: border-box;
  width: fit-content;
  height: fit-content;
  padding: ${(props) => box(props).space.sm};

  border-radius: 100%;
  border: 4px solid ${(props) => color(props).primary};

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: ${(props) => font(props).size["5xl"]};
    height: ${(props) => font(props).size["5xl"]};

    fill: ${(props) => color(props).primary};

    path {
      stroke: ${(props) => color(props).primary};
    }
  }
`;

const Title = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin-top: ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};
  text-align: center;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin-top: ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.sm};
  text-align: center;
`;
