import { darken, lighten } from "polished";

import { useEffect, useState } from "react";

import styled from "styled-components";

import CenterModal from "@components/frontside/mobile/CenterModal";
import ChapterService from "@services/frontside/ChapterService";
import { box, color, font } from "@utils/Themes";

export default function RequestAudioUsage() {
  const [isModalShow, setIsModalShow] = useState<boolean>(true);

  function onClickHandle(value: boolean) {
    ChapterService.update({ is_accept_audio: value });
    setIsModalShow(false);
    freezeScreen(false);
  }

  useEffect(() => {
    freezeScreen(true);
    return () => {
      freezeScreen(false);
    };
  }, []);

  return (
    <CenterModal isShow={isModalShow} setShow={() => null}>
      <Box>
        <Title>อนุญาตให้มีการเล่นเสียง</Title>
        <Text>คุณยอมรับให้มีการเล่นเสียง</Text>
        <Text>ในขณะกำลังอ่านหรือไม่ ?</Text>
        <AcceptButton onClick={() => onClickHandle(true)}>ยอมรับ</AcceptButton>
        <CancelButton onClick={() => onClickHandle(false)}>ไม่ยอมรับ</CancelButton>
      </Box>
    </CenterModal>
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

const BaseButton = styled.div`
  margin-top: ${(props) => box(props).space.md};
  padding: ${(props) => box(props).space.sm} ${(props) => box(props).space.xxl};

  border-radius: ${(props) => box(props).borderRadius["6xl"]};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const CancelButton = styled(BaseButton)`
  /* border: 1px solid red; */

  border: 1px solid ${(props) => color(props).error};
  color: ${(props) => darken(0.1, color(props).error)};

  &:hover {
    border: 1px solid ${(props) => darken(1.1 - font(props).opacity.hover, color(props).error)};
    color: ${(props) => darken(1.1 - font(props).opacity.hover, color(props).error)};
  }

  &:active {
    border: 1px solid ${(props) => darken(1.1 - font(props).opacity.active, color(props).error)};
    color: ${(props) => darken(1.1 - font(props).opacity.active, color(props).error)};
  }
`;

const AcceptButton = styled(BaseButton)`
  /* border: 1px solid red; */

  border: 1px solid ${(props) => color(props).primary};
  color: ${(props) => color(props).primary};

  &:hover {
    border: 1px solid ${(props) => darken(1.1 - font(props).opacity.hover, color(props).primary)};
    color: ${(props) => darken(1.1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    border: 1px solid ${(props) => darken(1.1 - font(props).opacity.active, color(props).primary)};
    color: ${(props) => darken(1.1 - font(props).opacity.active, color(props).primary)};
  }
`;

function freezeScreen(isFreeze: boolean) {
  if (isFreeze) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.height = "100%";
  } else {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.height = "";
  }
}
