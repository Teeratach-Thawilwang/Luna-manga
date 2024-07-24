import { useEffect } from "react";
import React from "react";

import { ThemeProvider } from "styled-components";

import { ThemeEnum } from "@enums/Theme";
import CookieBackofficeService from "@services/backoffice/CookieService";
import ThemeBackoficeService from "@services/backoffice/ThemeService";
import CookieFrontSideService from "@services/frontside/CookieService";
import ThemeFrontSideService from "@services/frontside/ThemeService";
import GlobalStyle from "@src/GlobalStyle";
import Themes from "@utils/Themes";

export default React.memo(function ThemeColorProvider({ children }: { children: JSX.Element }) {
  const themeService = isFrontSideUrl() ? ThemeFrontSideService : ThemeBackoficeService;
  const themeState = themeService.getTheme();
  const theme = getInitialTheme(themeState);

  useEffect(() => {
    themeService.update(theme as ThemeEnum);
  }, []);

  return (
    <ThemeProvider theme={Themes[theme as ThemeEnum]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
});

function isFrontSideUrl() {
  return !window.location.href.includes("/backoffice");
}

function getInitialTheme(themeState: ThemeEnum | null): ThemeEnum {
  if (themeState == null) {
    const cookieService = getCookieService();
    return cookieService.getTheme() ?? getPrefersColorBrowser(ThemeEnum.DARK);
  }
  return themeState;
}

function getCookieService() {
  return isFrontSideUrl() ? CookieFrontSideService : CookieBackofficeService;
}

function getPrefersColorBrowser(theme: ThemeEnum) {
  const mediaQueryList = window.matchMedia(`(prefers-color-scheme: ${theme})`);
  const hasMediaQueryPreference = typeof mediaQueryList.matches === "boolean";

  if (hasMediaQueryPreference) {
    return mediaQueryList.matches ? theme : ThemeEnum.DARK;
  }
  return ThemeEnum.DARK;
}
