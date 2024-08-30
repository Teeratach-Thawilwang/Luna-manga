import { darken, lighten } from "polished";

import styled from "styled-components";

import BookmarkService from "@services/BookmarkService";
import CustomerProfileService from "@services/CustomerProfileService";
import { box, color, font } from "@utils/Themes";

interface ConfirmDeleteBookmarkModalInterface {
  storyId: number;
  storyName: string;
  setShow: (value: boolean) => void;
}

export default function ConfirmDeleteBookmarkModal({ storyId, storyName, setShow }: ConfirmDeleteBookmarkModalInterface) {
  const customerId = CustomerProfileService.getCustomerId()!;

  function onClickHandle() {
    BookmarkService.deleteBookmark(storyId, customerId);
    setShow(false);
  }

  return (
    <Box>
      <Title>นำออกจากบุ๊คมาร์ก</Title>
      <Text>
        นำเรื่อง <b>{storyName}</b>
      </Text>
      <Text>ออกจากบุ๊กมาร์ค</Text>
      <ConfimButton onClick={onClickHandle}>ยืนยัน</ConfimButton>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: calc(100vw - 50px);
  padding: 10px;

  border-radius: ${(props) => box(props).borderRadius["xl"]};
  border: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainerHigh};
`;

const Title = styled.div`
  box-sizing: border-box;
  padding: 10px;

  border-bottom: 1px solid ${(props) => color(props).outlineVariant};

  color: ${(props) => color(props).primary};
  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  text-align: center;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;

  color: ${(props) => lighten(0.1, color(props).onSurface)};
  font-size: ${(props) => font(props).size.sm};
  font-weight: ${(props) => font(props).weight.regular};

  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;
  word-break: break-word;
  text-align: center;
`;

const ConfimButton = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.md};
  padding: ${(props) => box(props).space.sm} 0;

  border: 0 transparent;
  border-radius: ${(props) => box(props).borderRadius["5xl"]};
  border: 2px solid ${(props) => color(props).primary};

  color: ${(props) => color(props).primary};
  /* color: ${(props) => color(props).onPrimary}; */
  /* background-color: ${(props) => color(props).primary}; */

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    background-color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;
