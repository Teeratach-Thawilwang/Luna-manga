import { Link } from "react-router-dom";

import styled from "styled-components";

import { GroupSettingEnum, GroupSettingNameEnum, GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { PermissionEnum } from "@enums/backoffice/PermissionEnum";
import UserProfileService from "@services/backoffice/UserProfileService";
import { hasPermission } from "@utils/Helpers";

export default function CustomerReport({ groupSetting }: { groupSetting: GroupSettingEnum }) {
  const isMatchCustomerReportUrl = groupSetting == GroupSettingEnum.CUSTOMER_REPORT;
  const userPermissions = UserProfileService.getPermissions()!;
  const hasCustomerReportPermission = hasPermission(PermissionEnum.CUSTOMER_REPORT_VIEW, userPermissions);

  if (!hasCustomerReportPermission) {
    return null;
  }

  return (
    <MainButton to={GroupSettingUrlEnum.CUSTOMER_REPORT} $isActive={isMatchCustomerReportUrl}>
      <p>{GroupSettingNameEnum.CUSTOMER_REPORT}</p>
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
