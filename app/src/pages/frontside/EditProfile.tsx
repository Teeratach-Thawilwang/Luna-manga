import { useEffect } from "react";

import styled from "styled-components";

import FooterMobile from "@components/frontside/mobile/Footer";
import DetailMobile from "@components/frontside/mobile/editProfile/Detail";
import NavbarMobile from "@components/frontside/mobile/navbar/Navbar";
import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import DetailTablet from "@components/frontside/tablet/editProfile/Detail";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import CustomerProfileService from "@services/frontside/CustomerProfileService";
import EditCustomerProfileService from "@services/frontside/EditCustomerProfileService";
import { getResponsive } from "@utils/Hooks";

export default function EditProfile() {
  // console.log("In EditProfile");
  document.title = "Luna: Edit Profile";
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
      <Box>
        <NavbarMobile />
        <DetailMobile />
        <FooterMobile isShow={true} />
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
