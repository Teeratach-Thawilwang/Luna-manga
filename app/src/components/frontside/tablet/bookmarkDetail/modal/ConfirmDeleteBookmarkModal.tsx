import { darken, lighten } from "polished";

import styled from "styled-components";

import BookmarkService from "@services/frontside/BookmarkService";
import CustomerProfileService from "@services/frontside/CustomerProfileService";
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

  /* color: ${(props) => color(props).onSurface}; */
  color: ${(props) => lighten(0.1, color(props).onSurface)};
  font-size: ${(props) => font(props).size.lg};
  font-weight: ${(props) => font(props).weight.bold};

  text-align: center;
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 10px;

  color: ${(props) => lighten(0.1, color(props).onSurface)};
  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.regular};

  text-align: center;
`;

const ConfimButton = styled.div`
  height: 40px;
  margin-top: ${(props) => box(props).space.md};
  padding: 0 ${(props) => box(props).space.xxl};

  border: 0 transparent;
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => color(props).onPrimary};
  background-color: ${(props) => color(props).primary};

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
