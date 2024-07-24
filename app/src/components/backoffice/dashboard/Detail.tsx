import styled from "styled-components";

import Header from "@components/backoffice/Header";
import DashboardItem from "@components/backoffice/dashboard/DashboardItem";
import { DashboardInterface } from "@interfaces/backoffice/DashboardInterface";
import DashboardService from "@services/backoffice/DashboardService";

export default function Detail() {
  const dashboards = DashboardService.getDashboard();
  const dashboardItems = createDashboardItems(dashboards);
  return (
    <Box>
      <Header headerTitle="Dashboard" />
      <Content>{dashboardItems}</Content>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  min-width: 750px;
`;

const Content = styled.div`
  box-sizing: border-box;
  /* min-width: 750px; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin: 20px 20px 20px 20px;
`;

function createDashboardItems(dashboards: DashboardInterface[]) {
  return dashboards.map((dashboard: DashboardInterface, key) => {
    return <DashboardItem dashboard={dashboard} key={key} />;
  });
}
