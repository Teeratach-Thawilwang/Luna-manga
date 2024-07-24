import { styled } from "styled-components";

import { useDots } from "@utils/Hooks";
import { box, color, font } from "@utils/Themes";

export default function Searching() {
  const dots = useDots(400);
  return (
    <Box>
      <Text>กำลังค้นหา {dots}</Text>
    </Box>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: fit-content;
  margin-top: ${(props) => box(props).space.md};
  padding: ${(props) => box(props).space.md} 0;

  border-radius: ${(props) => box(props).borderRadius["5xl"]};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainer};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => color(props).surfaceContainerHigh};
  }
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  font-size: ${(props) => font(props).size.sm};

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;
