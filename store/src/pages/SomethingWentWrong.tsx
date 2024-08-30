import { Suspense, lazy } from "react";

import styled from "styled-components";

import FooterMobile from "@components/mobile/Footer";
import NavbarMobile from "@components/mobile/navbar/Navbar";
import DetailMobile from "@components/mobile/somethingWentWrong/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import { getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));
const DetailTablet = lazy(() => import("@components/tablet/somethingWentWrong/Detail"));

export default function SomethingWentWrong() {
  // console.log("In SomethingWentWrong");
  document.title = "Luna: Something Went Wrong";
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
