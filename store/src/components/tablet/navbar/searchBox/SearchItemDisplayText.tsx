import styled from "styled-components";

import { color, font } from "@utils/Themes";

export default function SearchItemDisplayText({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <Box onClick={onClick}>
      <Text>{text}</Text>
    </Box>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 80px;
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

  font-size: ${(props) => font(props).size.md};

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;
