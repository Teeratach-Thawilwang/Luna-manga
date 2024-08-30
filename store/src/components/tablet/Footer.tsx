import { forwardRef } from "react";

import styled from "styled-components";

import { box, color } from "@utils/Themes";

export default forwardRef<HTMLDivElement | null, { isShow: boolean }>(function Footer({ isShow }, ref) {
  return (
    <Box ref={ref} $isShow={isShow}>
      <Text>
        © Copyright {new Date().getFullYear()} - {import.meta.env.VITE_WEB_URL}.
      </Text>
      <Text>อ่านการ์ตูนออนไลน์ อ่านการ์ตูนแปลไทย เว็บอ่านการ์ตูน มังงะ มังงะแปลไทย.</Text>
      <Text>ติดต่อแอดมินหรือติดต่อลงโฆษณา {import.meta.env.VITE_ADMIN_EMAIL}.</Text>
    </Box>
  );
});

const Box = styled.div<{ $isShow: boolean }>`
  box-sizing: border-box;
  width: 100%;
  margin-top: auto;
  padding: ${(props) => box(props).space.lg} 0;

  border-top: 1px solid ${(props) => color(props).outlineVariant};
  background-color: ${(props) => color(props).surfaceContainerLow};

  display: ${(props) => (props.$isShow ? "block" : "none")};
`;

const Text = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  margin: 5px auto 5px auto;

  color: ${(props) => color(props).onSurfaceVariant};
  text-align: center;
  font-size: 16px;
  font-weight: 400;

  user-select: text;
`;
