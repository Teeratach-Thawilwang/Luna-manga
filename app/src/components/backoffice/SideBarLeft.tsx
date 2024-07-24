import { Link } from "react-router-dom";

import styled from "styled-components";

import BannerSetting from "@components/backoffice/sideBarLeft/BannerSetting";
import ChapterSetting from "@components/backoffice/sideBarLeft/ChapterSetting";
import CustomerReport from "@components/backoffice/sideBarLeft/CustomerReport";
import CustomerSetting from "@components/backoffice/sideBarLeft/CustomerSetting";
import StorySetting from "@components/backoffice/sideBarLeft/StorySetting";
import UserSetting from "@components/backoffice/sideBarLeft/UserSetting";
import WidgetSetting from "@components/backoffice/sideBarLeft/WidgetSetting";
import { GroupSettingEnum, GroupSettingNameEnum, GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";

export default function SideBarLeft({ groupSetting }: { groupSetting: GroupSettingEnum }) {
  return (
    <Box>
      <Logo to={GroupSettingUrlEnum.DASHBOARD}>Luna</Logo>
      <StorySetting groupSetting={groupSetting} />
      <ChapterSetting groupSetting={groupSetting} />
      <CustomerSetting groupSetting={groupSetting} />
      <UserSetting groupSetting={groupSetting} />
      <BannerSetting groupSetting={groupSetting} />
      <WidgetSetting groupSetting={groupSetting} />
      <CustomerReport groupSetting={groupSetting} />
      <FrontSide href="/" target="_blank">
        {GroupSettingNameEnum.FRONT_SIDE}
      </FrontSide>
    </Box>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  width: 250px;
  background-color: #212b36;
`;

const Logo = styled(Link)`
  /* border: 1px solid green; */
  box-sizing: border-box;
  width: 250px;
  height: 90px;

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;
  font-size: 50px;
  font-family: Berkshire Swash;
  font-weight: normal;
  background: linear-gradient(to bottom right, #2e2774, #ffffff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

const FrontSide = styled.a`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 250px;
  height: 50px;
  padding-left: 20px;

  color: #9aa8b3;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;

  display: flex;
  justify-content: start;
  align-items: center;
  transition: 200ms ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: #404d5b;
    /* color: #fff; */
  }
`;
