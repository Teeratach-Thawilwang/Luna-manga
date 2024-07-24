import { useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import ExpandLeftIcon from "@components/iconSvg/ExpandLeftIcon";
import { GroupSettingEnum, GroupSettingNameEnum, GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { PermissionEnum } from "@enums/backoffice/PermissionEnum";
import UserProfileService from "@services/backoffice/UserProfileService";
import { hasPermission } from "@utils/Helpers";

export default function WidgetSetting({ groupSetting }: { groupSetting: GroupSettingEnum }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const isMatchWidgetListUrl = groupSetting == GroupSettingEnum.WIDGET_LIST;
  const isMatchWidgetSequenceUrl = groupSetting == GroupSettingEnum.WIDGET_SEQUENCE;
  const isMainButtonActive = isMatchWidgetListUrl || isMatchWidgetSequenceUrl;
  const userPermissions = UserProfileService.getPermissions()!;
  const hasWidgetPermission = hasPermission(PermissionEnum.WIDGET_VIEW, userPermissions);

  if (!hasWidgetPermission) {
    return null;
  }

  return (
    <Box $isOpen={isDropdownOpen}>
      <MainButton $isActive={isMainButtonActive} onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <p>Widget</p>
        <ExpandDropDownBox $isOpen={isDropdownOpen} $isActive={isMainButtonActive}>
          <ExpandLeftIcon />
        </ExpandDropDownBox>
      </MainButton>
      <ItemList $isOpen={isDropdownOpen}>
        <Item to={GroupSettingUrlEnum.WIDGET_LIST} $isOpen={isDropdownOpen} $isActive={isMatchWidgetListUrl}>
          <span>• {GroupSettingNameEnum.WIDGET_LIST}</span>
        </Item>
        <Item to={GroupSettingUrlEnum.WIDGET_SEQUENCE} $isOpen={isDropdownOpen} $isActive={isMatchWidgetSequenceUrl}>
          <span>• {GroupSettingNameEnum.WIDGET_SEQUENCE}</span>
        </Item>
      </ItemList>
    </Box>
  );
}

const Box = styled.div<{ $isOpen: boolean }>`
  /* border: 1px solid red; */
  /* height: ${(props) => (props.$isOpen ? "calc(35px * 2 + 50px)" : "50px")}; */
  transition: 200ms ease-in-out;
`;

const MainButton = styled.div<{ $isActive: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 250px;
  height: 50px;
  padding-left: 20px;

  p {
    color: ${(props) => (props.$isActive ? "#fff" : "#9aa8b3")};
    font-size: 20px;
    font-weight: bold;
  }

  display: flex;
  justify-content: start;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const ExpandDropDownBox = styled.div<{ $isOpen: boolean; $isActive: boolean }>`
  width: 25px;
  height: 25px;
  margin-right: 20px;
  margin-left: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  transform: ${(props) => (props.$isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
  transition: 200ms ease-in-out;

  svg {
    width: 25px;
    height: 25px;
  }

  path {
    stroke: ${(props) => (props.$isActive ? "#fff" : "#9aa8b3")};
    stroke-width: 5px;
  }
`;

const ItemList = styled.ul<{ $isOpen: boolean }>`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 250px;
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: 200ms ease-in-out;

  margin: 0;
  padding: 0;
`;

const Item = styled(Link)<{ $isOpen: boolean; $isActive: boolean }>`
  /* border: 1px solid green; */
  text-decoration: none;
  box-sizing: border-box;
  padding-left: 40px;
  height: ${(props) => (props.$isOpen ? "35px" : "0px")};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transition: 200ms ease-in-out;

  display: flex;
  justify-content: start;
  align-items: center;

  span {
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
    color: ${(props) => (props.$isActive ? "#fff" : "#9aa8b3")};
    font-size: 18px;
  }

  span:hover {
    /* color: #ffffff; */
  }

  &:hover {
    cursor: pointer;
    background-color: #404d5b;
  }
`;
