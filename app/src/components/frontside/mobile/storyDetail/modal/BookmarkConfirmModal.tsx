import { darken, lighten } from "polished";

import styled from "styled-components";

import BookmarkService from "@services/frontside/BookmarkService";
import CustomerProfileService from "@services/frontside/CustomerProfileService";
import { box, color, font } from "@utils/Themes";

interface BookmarkConfirmModalInterface {
  storyId: number;
  storyName: string;
  isBookmark: boolean;
  setShow: (value: boolean) => void;
}

export default function BookmarkConfirmModal({ storyId, storyName, isBookmark, setShow }: BookmarkConfirmModalInterface) {
  const customerId = CustomerProfileService.getCustomerId()!;
  const title = getTitle(isBookmark);
  const text = getText(isBookmark);

  function onClickHandle() {
    if (isBookmark) {
      BookmarkService.deleteBookmark(storyId, customerId);
      setShow(false);
      return;
    }
    BookmarkService.addBookmark(storyId, customerId);
    setShow(false);
  }

  return (
    <Box>
      <Title>{title}</Title>
      <Text>
        นำเรื่อง <b>{storyName}</b>
      </Text>
      <Text>{text}</Text>
      <ConfimButton onClick={onClickHandle}>ยืนยัน</ConfimButton>
    </Box>
  );
}
const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  min-width: 300px;
  padding: 10px;

  border-radius: ${(props) => box(props).borderRadius.md};
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
  margin-top: 10px;

  color: ${(props) => lighten(0.1, color(props).onSurface)};
  font-size: ${(props) => font(props).size.sm};
  font-weight: ${(props) => font(props).weight.regular};

  text-align: center;
`;

const ConfimButton = styled.div`
  height: 40px;
  margin-top: ${(props) => box(props).space.md};
  padding: 0 ${(props) => box(props).space.xxl};

  border: 1px solid ${(props) => color(props).primary};
  border-radius: ${(props) => box(props).borderRadius["6xl"]};

  color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  &:hover {
    border: 1px solid ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
    color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    border: 1px solid ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
    color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
  }
`;

function getTitle(isBookmark: boolean) {
  if (isBookmark) {
    return "นำออกจากบุ๊คมาร์ก";
  }
  return "เพิ่มเข้าบุ๊คมาร์ค";
}

function getText(isBookmark: boolean) {
  if (isBookmark) {
    return "ออกจากบุ๊กมาร์ค";
  }
  return "เข้าบุ๊คมาร์ค";
}
