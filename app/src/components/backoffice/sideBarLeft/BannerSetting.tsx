import { Link } from "react-router-dom";

import styled from "styled-components";

import { GroupSettingEnum, GroupSettingNameEnum, GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { PermissionEnum } from "@enums/backoffice/PermissionEnum";
import UserProfileService from "@services/backoffice/UserProfileService";
import { hasPermission } from "@utils/Helpers";

export default function BannerSetting({ groupSetting }: { groupSetting: GroupSettingEnum }) {
  const isMatchBannerUrl = groupSetting == GroupSettingEnum.BANNER;
  const userPermissions = UserProfileService.getPermissions()!;
  const hasBannerPermission = hasPermission(PermissionEnum.BANNER_VIEW, userPermissions);

  if (!hasBannerPermission) {
    return null;
  }

  return (
    <MainButton to={GroupSettingUrlEnum.BANNER} $isActive={isMatchBannerUrl}>
      <p>{GroupSettingNameEnum.BANNER}</p>
    </MainButton>
  );
}

const MainButton = styled(Link)<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  text-decoration: none;
  box-sizing: border-box;
  width: 250px;
  height: 50px;
  padding-left: 20px;

  display: flex;
  justify-content: start;
  align-items: center;
  transition: 200ms ease-in-out;

  p {
    color: ${(props) => (props.$isActive ? "#fff" : "#9aa8b3")};
    font-size: 20px;
    font-weight: bold;
  }

  &:hover {
    cursor: pointer;
    background-color: #404d5b;

    p {
      /* color: #fff; */
    }
  }
`;
