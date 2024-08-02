import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import styled from "styled-components";

import FooterTablet from "@components/frontside/tablet/Footer";
import GoTopButtonTablet from "@components/frontside/tablet/GoTopButton";
import DetailTablet from "@components/frontside/tablet/confirmEmail/Detail";
import NavbarTablet from "@components/frontside/tablet/navbar/Navbar";
import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import AuthService from "@services/frontside/AuthService";
import { getResponsive } from "@utils/Hooks";

export default function ConfirmEmail() {
  // console.log("In ConfirmEmail");
  document.title = "Luna: ยืนยันอีเมล";
  const responsive = getResponsive();
  const footerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const [URLSearchParams] = useSearchParams();
  const code = URLSearchParams.get("code");

  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (code) {
      AuthService.confirmEmail(code, setIsSuccess, setIsLoading);
    } else {
      navigate("/");
    }
  }, []);

  if (responsive === ResponsiveEnum.MOBILE) {
    return (
      <>
        <Box>
          <NavbarTablet />
          <DetailTablet isSuccess={isSuccess} isLoading={isLoading} />
          <div ref={footerRef}></div>
          <FooterTablet isShow={!isLoading} />
        </Box>
        <GoTopButtonTablet />
      </>
    );
  }

  return (
    <>
      <Box>
        <NavbarTablet />
        <DetailTablet isSuccess={isSuccess} isLoading={isLoading} />
        <div ref={footerRef}></div>
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
