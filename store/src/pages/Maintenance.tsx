import { styled } from "styled-components";

import { box, color, font } from "@utils/Themes";

export default function Maintenance() {
  return (
    <Box>
      <Logo>Luna</Logo>
      <Title>Maintenance mode</Title>
      <Text>ทีมงานกำลังปรับปรุงเว็บไซต์</Text>
      <Text>เว็ปจะกลับมาใช้งานได้ในเร็วๆ นี้</Text>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100dvh;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const Logo = styled.div`
  font-size: 4rem;
  font-weight: ${(props) => font(props).weight.bold};
  font-family: Berkshire Swash;
  margin: 0;

  color: ${(props) => color(props).error};

  @media (max-width: 700px) {
    font-size: 3rem;
  }
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: ${(props) => font(props).weight.bold};
  margin-bottom: ${(props) => box(props).space.sm};
  color: ${(props) => color(props).primary};

  @media (max-width: 700px) {
    font-size: 1.1rem;
  }
`;

const Text = styled.div`
  font-size: 1rem;
  color: ${(props) => color(props).onSurfaceVariant};

  @media (max-width: 700px) {
    font-size: 0.9rem;
  }
`;
