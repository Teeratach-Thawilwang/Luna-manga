import React, { useEffect } from "react";

import { ThemeProvider } from "styled-components";

import { ThemeEnum } from "@enums/Theme";
import CookieService from "@services/CookieService";
import ThemeService from "@services/ThemeService";
import GlobalStyle from "@src/GlobalStyle";
import Themes from "@utils/Themes";

export default React.memo(function ThemeColorProvider({ children }: { children: JSX.Element }) {
  const themeState = ThemeService.getTheme();
  const theme = getInitialTheme(themeState);

  useEffect(() => {
    ThemeService.update(theme as ThemeEnum);
  }, []);

  return (
    <ThemeProvider theme={Themes[theme as ThemeEnum]}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
});

function getInitialTheme(themeState: ThemeEnum | null): ThemeEnum {
  if (themeState == null) {
    return CookieService.getTheme() ?? getPrefersColorBrowser(ThemeEnum.DARK);
  }
  return themeState;
}

function getPrefersColorBrowser(theme: ThemeEnum) {
  const mediaQueryList = window.matchMedia(`(prefers-color-scheme: ${theme})`);
  const hasMediaQueryPreference = typeof mediaQueryList.matches === "boolean";

  if (hasMediaQueryPreference) {
    return mediaQueryList.matches ? theme : ThemeEnum.DARK;
  }
  return ThemeEnum.DARK;
}
