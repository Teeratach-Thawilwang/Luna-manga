import styled from "styled-components";

import FooterMobile from "@components/frontside/mobile/Footer";
import NavbarMobile from "@components/frontside/mobile/navbar/Navbar";
import DetailMobile from "@components/frontside/mobile/resetPasswordEmailSent/Detail";
import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import DetailTablet from "@components/frontside/tablet/resetPasswordEmailSent/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import { getResponsive } from "@utils/Hooks";

export default function ResetPasswordEmailSent() {
  // console.log("In ResetPasswordEmailSent");
  document.title = "Luna: Reset Password.";
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
