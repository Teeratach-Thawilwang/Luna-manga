import styled from "styled-components";

import CorrectIcon from "@components/iconSvg/CorrectIcon";
import { box, color, font } from "@utils/Themes";

export default function Detail() {
  return (
    <Box>
      <Card>
        <CorrectIconBox>
          <CorrectIcon />
        </CorrectIconBox>
        <Title>Register successful.</Title>
        <Text>สมัครสมาชิกสำเร็จ กรุณาทำการยืนยันอีเมลก่อนเข้าสู่ระบบ</Text>
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

const Card = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 700px;
  padding: ${(props) => box(props).space.lg};

  border-radius: ${(props) => box(props).borderRadius.md};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CorrectIconBox = styled.div`
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

  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};
  text-align: center;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin-top: ${(props) => box(props).space.md};

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.md};
  text-align: center;
`;
