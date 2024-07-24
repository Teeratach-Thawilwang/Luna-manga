import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/widgetDetail/FooterControl";
import InputBanner from "@components/backoffice/widgetForm/InputBanner";
import InputName from "@components/backoffice/widgetForm/InputName";
import InputStatus from "@components/backoffice/widgetForm/InputStatus";
import InputTitle from "@components/backoffice/widgetForm/InputTitle";
import InputType from "@components/backoffice/widgetForm/InputType";
import WidgetService from "@services/backoffice/WidgetService";

export default function Detail() {
  const widget = WidgetService.getWidget();

  if (widget == null) {
    return (
      <Box>
        <Header headerTitle="Widget Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="Widget Detail" />
      <Content>
        <InputName initial={widget.name} />
        <InputTitle initial={widget.title} />
        <InputType initial={widget.type} />
        <InputStatus initial={widget.status} />
        <InputBanner initial={widget.banners} />
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

const BoxLoading = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 100%;

  flex-grow: 1;
  /* min-height: calc(100vh - 60px - 150px); */

  display: flex;
  justify-content: center;
  align-items: center;
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
