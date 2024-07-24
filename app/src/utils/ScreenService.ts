import { ResponsiveEnum, ScreenWidthEnum } from "@enums/ResponsiveEnum";

export function getDeviceScreenWidth() {
  return document.body.clientWidth;
}

export function getDeviceScreenHeight() {
  return document.body.clientHeight;
}

export function getResponsiveDevice(): ResponsiveEnum {
  if (document.body.clientWidth >= ScreenWidthEnum.DESKTOP) {
    return ResponsiveEnum.DESKTOP;
  }
  if (document.body.clientWidth < ScreenWidthEnum.DESKTOP && document.body.clientWidth >= ScreenWidthEnum.MOBILE) {
    return ResponsiveEnum.TABLET;
  }
  if (document.body.clientWidth < ScreenWidthEnum.MOBILE) {
    return ResponsiveEnum.MOBILE;
  }
  return ResponsiveEnum.DESKTOP;
}

export function responsiveHandle(state: ResponsiveEnum, setState: React.Dispatch<React.SetStateAction<ResponsiveEnum>>): void {
  const responsiveDevice = getResponsiveDevice();
  if (state !== responsiveDevice) {
    setState(responsiveDevice);
  }
}
