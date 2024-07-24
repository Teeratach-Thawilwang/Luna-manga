import { useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import FooterMobile from "@components/frontside/mobile/Footer";
import NavbarMobile from "@components/frontside/mobile/navbar/Navbar";
import DetailMobile from "@components/frontside/mobile/profile/Detail";
import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import DetailTablet from "@components/frontside/tablet/profile/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import ProfilePostService from "@services/frontside/ProfilePostService";
import ProfileService from "@services/frontside/ProfileService";
import { getResponsive } from "@utils/Hooks";

export default function Profile() {
  // console.log("In Home");
  document.title = "Luna: Profile";
  const { customerId } = useParams();
  const responsive = getResponsive();
  const isLoading = ProfileService.getIsLoading();
  const profileId = ProfileService.getProfileId();

  useEffect(() => {
    if (profileId != Number(customerId!)) {
      ProfileService.loadProfile(Number(customerId!));
      ProfilePostService.loadIndex(Number(customerId!));
    }

    return () => {};
  }, [customerId]);

  if (responsive === ResponsiveEnum.MOBILE) {
    return (
      <Box>
        <NavbarMobile />
        <DetailMobile />
        <FooterMobile isShow={!isLoading} />
      </Box>
    );
  }

  return (
    <>
      <Box>
        <NavbarTablet />
        <DetailTablet />
        <FooterTablet isShow={!isLoading} />
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
