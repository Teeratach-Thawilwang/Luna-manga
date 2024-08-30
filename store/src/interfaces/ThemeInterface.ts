import { ThemeEnum } from "@enums/Theme";

// State Interface
export interface ThemeSliceInterface {
  theme: ThemeEnum | null;
}

export interface ColorInterface {
  primary: string;
  surfaceTint: string;
  onPrimary: string;
  primaryContainer: string;
  onPrimaryContainer: string;
  secondary: string;
  onSecondary: string;
  secondaryContainer: string;
  onSecondaryContainer: string;
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  error: string;
  onError: string;
  errorContainer: string;
  onErrorContainer: string;
  background: string;
  onBackground: string;
  surface: string;
  onSurface: string;
  surfaceVariant: string;
  onSurfaceVariant: string;
  outline: string;
  outlineVariant: string;
  shadow: string;
  scrim: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  primaryFixed: string;
  onPrimaryFixed: string;
  primaryFixedDim: string;
  onPrimaryFixedVariant: string;
  secondaryFixed: string;
  onSecondaryFixed: string;
  secondaryFixedDim: string;
  onSecondaryFixedVariant: string;
  tertiaryFixed: string;
  onTertiaryFixed: string;
  tertiaryFixedDim: string;
  onTertiaryFixedVariant: string;
  surfaceDim: string;
  surfaceBright: string;
  surfaceContainerLowest: string;
  surfaceContainerLow: string;
  surfaceContainer: string;
  surfaceContainerHigh: string;
  surfaceContainerHighest: string;
}

export interface FontSizeInterface {
  "4xs": string;
  "3xs": string;
  "2xs": string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
}

export interface LineHeightInterface {
  "5xs": string;
  "4xs": string;
  "3xs": string;
  "2xs": string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

export interface FontWeightInterface {
  light: number;
  regular: number;
  medium: number;
  bold: number;
  extraBold: number;
}

export interface OpacityInterface {
  normal: number;
  hover: number;
  inactive: number;
  active: number;
  focus: number;
  disabled: number;
}

export interface BoxBorderRadiusInterface {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
  full: string;
}

export interface BoxZIndexInterface {
  base: string;
  dropdown: string;
  sticky: string;
  fixed: string;
  modalBackdrop: string;
  modal: string;
  popover: string;
  tooltip: string;
}

export interface BoxSpaceInterface {
  none: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

export interface TypographyInterface {
  size: FontSizeInterface;
  lineHeight: LineHeightInterface;
  weight: FontWeightInterface;
  opacity: OpacityInterface;
}

export interface BoxInterface {
  borderRadius: BoxBorderRadiusInterface;
  zIndex: BoxZIndexInterface;
  space: BoxSpaceInterface;
}

export interface ThemeInterface {
  colorScheme: ThemeEnum;
  color: ColorInterface;
  font: TypographyInterface;
  box: BoxInterface;
}
