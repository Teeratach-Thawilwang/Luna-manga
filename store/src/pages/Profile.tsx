import { Suspense, lazy, useEffect } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import FooterMobile from "@components/mobile/Footer";
import NavbarMobile from "@components/mobile/navbar/Navbar";
import DetailMobile from "@components/mobile/profile/Detail";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import ProfilePostService from "@services/ProfilePostService";
import ProfileService from "@services/ProfileService";
import { getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));
const DetailTablet = lazy(() => import("@components/tablet/profile/Detail"));

export default function Profile() {
  // console.log("In Home");
  document.title = "Luna: โปรไฟล์";
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
      <Suspense fallback={<Box />}>
        <Box>
          <NavbarMobile />
          <DetailMobile />
          <FooterMobile isShow={!isLoading} />
        </Box>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Box />}>
      <Box>
        <NavbarTablet />
        <DetailTablet />
        <FooterTablet isShow={!isLoading} />
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
