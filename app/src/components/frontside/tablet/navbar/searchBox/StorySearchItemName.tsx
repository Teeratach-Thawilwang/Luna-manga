import { styled } from "styled-components";

import { color, font } from "@utils/Themes";

export default function StorySearchItemName({ name, authorName }: { name: string; authorName: string }) {
  return (
    <Box>
      <Name>{name}</Name>
      <Author>ผู้แต่ง : {authorName}</Author>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-left: 0;
  margin-right: auto;

  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;

const Name = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  color: ${(props) => color(props).onSurface};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;

const Author = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.md};

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
`;
