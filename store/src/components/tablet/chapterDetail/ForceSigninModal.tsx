import { darken, lighten } from "polished";

import { useEffect } from "react";

import styled from "styled-components";

import CenterModal from "@components/tablet/CenterModal";
import SignInSignUpForm from "@components/tablet/navbar/signInSignUpForm/SignInSignUpForm";
import SignInSignUpService from "@services/SignInSignUpService";
import { box, color, font } from "@utils/Themes";

export default function ForceSigninModal() {
  useEffect(() => {
    freezeScreen(true);
    return () => {
      freezeScreen(false);
    };
  }, []);

  return (
    <CenterModal isShow={true} setShow={() => null}>
      <Box>
        <Title>ประกาศถึงผู้อ่านทุกท่าน</Title>
        <Text>ขณะนี้เว็บไซต์กำลังพิจารณาหยุดให้บริการ เนื่องจากต้นทุนค่าใช้จ่ายและเวลาในการจัดการ</Text>
        <Text>เรายึดมั่นในนโยบายที่ไม่รบกวนการอ่านด้วยโฆษณาที่น่ารำคาญและมุ่งสร้างประสบการณ์ที่ดีที่สุดให้ผู้ใช้</Text>
        <Text>
          หากคุณชื่นชอบเว็บไซต์ของเราและอยากให้เปิดทำการต่อ
          <br />
          ขอเชิญสมัครสมาชิกเพื่อแสดงตัวตนและเป็นกำลังใจให้เรา
        </Text>
        <Text>
          การสมัครสมาชิกไม่มีค่าใช้จ่าย
          <br />
          มีเพียงเพื่อให้เราทราบจำนวนผู้อ่านที่แท้จริง
          <br />
          ขอบคุณที่สนใจเว็ปไซต์เราเสมอมา❤️
        </Text>
        <Button onClick={() => SignInSignUpService.setIsShow(true)}>ดำเนินการต่อ</Button>
        <SignInSignUpForm />
      </Box>
    </CenterModal>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  min-width: 700px;
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

const Button = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin-top: ${(props) => box(props).space.md};
  padding: ${(props) => box(props).space.sm} 0;
  border-radius: ${(props) => box(props).borderRadius.md};

  color: ${(props) => color(props).onPrimary};
  background-color: ${(props) => color(props).primary};

  font-size: ${(props) => font(props).size.md};
  font-weight: ${(props) => font(props).weight.bold};
  line-height: ${(props) => font(props).lineHeight.md};
  font-family: Inter;
  text-align: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => darken(1 - font(props).opacity.hover, color(props).primary)};
  }

  &:active {
    background-color: ${(props) => darken(1 - font(props).opacity.active, color(props).primary)};
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
