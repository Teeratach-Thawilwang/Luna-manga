import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import ChapterDetail from "@components/backoffice/customerReportDetail/ChapterDetail";
import CommentDetail from "@components/backoffice/customerReportDetail/CommentDetail";
import InputIsAccept from "@components/backoffice/customerReportDetail/InputIsAccept";
import PostDetail from "@components/backoffice/customerReportDetail/PostDetail";
import ReportGroup from "@components/backoffice/customerReportDetail/ReportGroup";
import ReporterDetail from "@components/backoffice/customerReportDetail/ReporterDetail";
import StoryDetail from "@components/backoffice/customerReportDetail/StoryDetail";
import { CustomerReportSourceEnum } from "@enums/backoffice/CustomerReportSourceEnum";
import CustomerReportService from "@services/backoffice/CustomerReportService";

export default function Detail() {
  const customerReport = CustomerReportService.getCustomerReport();
  const elememnt = customerReport ? createElementBySource(customerReport.source) : null;

  if (customerReport == null) {
    return (
      <Box>
        <Header headerTitle="Customer Report Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="Customer Report Detail" />
      <Content>
        <ReportGroup />
        <ReporterDetail />
        {elememnt}
        <InputIsAccept />
      </Content>
      <Space />
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

const Content = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  /* min-width: 750px; */

  margin: 20px 20px 20px 20px;
`;

const Space = styled.div`
  flex-grow: 1;
  margin: auto 0 auto 0;
`;

function createElementBySource(type: CustomerReportSourceEnum) {
  switch (type) {
    case CustomerReportSourceEnum.STORY:
      return <StoryDetail />;
    case CustomerReportSourceEnum.CHAPTER:
      return <ChapterDetail />;
    case CustomerReportSourceEnum.POST:
      return <PostDetail />;
    case CustomerReportSourceEnum.COMMENT:
      return <CommentDetail />;

    default:
      return null;
  }
}
