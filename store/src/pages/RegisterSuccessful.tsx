import { Suspense, lazy } from "react";

import styled from "styled-components";

import FooterMobile from "@components/mobile/Footer";
import NavbarMobile from "@components/mobile/navbar/Navbar";
import DetailMobile from "@components/mobile/registerSuccessful/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import { getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));
const DetailTablet = lazy(() => import("@components/tablet/registerSuccessful/Detail"));

export default function RegisterSuccessful() {
  // console.log("In RegisterSuccessful");
  document.title = "Luna: สมัครสมาชิกสำเร็จ";
  const responsive = getResponsive();

  if (responsive === ResponsiveEnum.MOBILE) {
    return (
      <Suspense fallback={<Box />}>
        <Box>
          <NavbarMobile />
          <DetailMobile />
          <FooterMobile isShow={true} />
          <BottomSpace />
        </Box>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Box />}>
      <Box>
        <NavbarTablet />
        <DetailTablet />
        <FooterTablet isShow={true} />
      </Box>
      <GoTopButtonTablet />
    </Suspense>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-height: 100lvh;

  display: flex;
  flex-direction: column;
`;

const BottomSpace = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
`;
