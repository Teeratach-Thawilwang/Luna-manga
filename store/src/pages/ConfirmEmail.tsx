import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import styled from "styled-components";

import { ResponsiveEnum } from "@enums/ResponsiveEnum";
import AuthService from "@services/AuthService";
import { getResponsive } from "@utils/Hooks";

const FooterTablet = lazy(() => import("@components/tablet/Footer"));
const GoTopButtonTablet = lazy(() => import("@components/tablet/GoTopButton"));
const DetailTablet = lazy(() => import("@components/tablet/confirmEmail/Detail"));
const NavbarTablet = lazy(() => import("@components/tablet/navbar/Navbar"));

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
      <Suspense fallback={<Box />}>
        <Box>
          <NavbarTablet />
          <DetailTablet isSuccess={isSuccess} isLoading={isLoading} />
          <div ref={footerRef}></div>
          <FooterTablet isShow={!isLoading} />
        </Box>
        <GoTopButtonTablet />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Box />}>
      <Box>
        <NavbarTablet />
        <DetailTablet isSuccess={isSuccess} isLoading={isLoading} />
        <div ref={footerRef}></div>
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
