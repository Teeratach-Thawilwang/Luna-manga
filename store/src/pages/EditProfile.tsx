import { Suspense, lazy, useEffect } from "react";

import styled from "styled-components";

import FooterMobile from "@components/mobile/Footer";
import DetailMobile from "@components/mobile/editProfile/Detail";
import NavbarMobile from "@components/mobile/navbar/Navbar";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import CustomerProfileService from "@services/CustomerProfileService";
import EditCustomerProfileService from "@services/EditCustomerProfileService";
import { getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const DetailTablet = lazy(() => import("@components/tablet/editProfile/Detail"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));

export default function EditProfile() {
  // console.log("In EditProfile");
  document.title = "Luna: แก้ไขโปรไฟล์";
  const responsive = getResponsive();
  const profile = CustomerProfileService.getProfile();

  useEffect(() => {
    if (profile) {
      const profileParams = {
        id: profile.id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        nickName: profile.nick_name,
        email: profile.email,
      };
      EditCustomerProfileService.update(profileParams);
    }

    return () => {
      EditCustomerProfileService.clearState();
    };
  }, [profile]);

  if (responsive === ResponsiveEnum.MOBILE) {
    return (
      <Suspense fallback={<Box />}>
        <Box>
          <NavbarMobile />
          <DetailMobile />
          <FooterMobile isShow={true} />
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
