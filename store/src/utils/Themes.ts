import Box from "@constants/Box.json";
import M3 from "@constants/M3.json";
import Font from "@constants/Typography.json";

import { ThemeEnum } from "@enums/Theme";
import { BoxInterface, ColorInterface, ThemeInterface, TypographyInterface } from "@interfaces/ThemeInterface";

const baseTheme: ThemeInterface = {
  colorScheme: ThemeEnum.DARK,
  color: M3.schemes.dark,
  font: Font.font,
  box: Box,
};

const darkTheme: ThemeInterface = {
  ...baseTheme,
  colorScheme: ThemeEnum.DARK,
  color: M3.schemes.dark,
};

const lightTheme: ThemeInterface = {
  ...baseTheme,
  colorScheme: ThemeEnum.LIGHT,
  color: M3.schemes.light,
};

export default {
  dark: darkTheme,
  light: lightTheme,
};

export function theme(props: any) {
  return props.theme as ThemeEnum;
}

export function color(props: any) {
  return props.theme.color as ColorInterface;
}

export function font(props: any) {
  return props.theme.font as TypographyInterface;
}

export function box(props: any) {
  return props.theme.box as BoxInterface;
}
