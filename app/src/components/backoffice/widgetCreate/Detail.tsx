import { useParams } from "react-router-dom";

import styled from "styled-components";

import Header from "@components/backoffice/Header";
import FooterControl from "@components/backoffice/widgetCreate/FooterControl";
import InputBanner from "@components/backoffice/widgetForm/InputBanner";
import InputName from "@components/backoffice/widgetForm/InputName";
import InputStatus from "@components/backoffice/widgetForm/InputStatus";
import InputTitle from "@components/backoffice/widgetForm/InputTitle";
import InputType from "@components/backoffice/widgetForm/InputType";
import { GroupSettingUrlEnum } from "@enums/backoffice/GroupSettingEnum";
import { WidgetTypeEnum } from "@enums/backoffice/WidgetTypeEnum";
import { navigateTo } from "@utils/Helpers";

export default function Detail() {
  const { type } = useParams();
  const bannerType = getWidgetType(type);

  return (
    <Box>
      <Header headerTitle="Widget Create" />
      <Content>
        <InputName />
        <InputTitle />
        <InputType initial={bannerType} />
        <InputStatus />
        <InputBanner />
      </Content>
      <Space />
      <FooterControl />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-width: 750px;

  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Content = styled.form`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* min-width: 750px; */

  margin: 20px 20px 20px 20px;
`;

const Space = styled.div`
  flex-grow: 1;
  margin: auto 0 auto 0;
`;

function getWidgetType(type: string | undefined): WidgetTypeEnum {
  if (type == undefined) {
    navigateTo(GroupSettingUrlEnum.WIDGET_LIST);
  }

  const isTypeValid = Object.values(WidgetTypeEnum).some((bannerType) => bannerType == type);
  if (!isTypeValid) {
    navigateTo(GroupSettingUrlEnum.WIDGET_LIST);
  }

  return type as WidgetTypeEnum;
}
