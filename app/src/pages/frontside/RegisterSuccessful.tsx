import styled from "styled-components";

import FooterMobile from "@components/frontside/mobile/Footer";
import NavbarMobile from "@components/frontside/mobile/navbar/Navbar";
import DetailMobile from "@components/frontside/mobile/registerSuccessful/Detail";
import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import DetailTablet from "@components/frontside/tablet/registerSuccessful/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import { getResponsive } from "@utils/Hooks";

export default function RegisterSuccessful() {
  // console.log("In RegisterSuccessful");
  document.title = "Luna: Register Successful";
  const responsive = getResponsive();

  if (responsive === ResponsiveEnum.MOBILE) {
    return (
      <Box>
        <NavbarMobile />
        <DetailMobile />
        <FooterMobile isShow={true} />
        <BottomSpace />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <NavbarTablet />
        <DetailTablet />
        <FooterTablet isShow={true} />
      </Box>
      <GoTopButtonTablet />
    </>
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
