import styled from "styled-components";

import { ReporterInterface } from "@interfaces/backoffice/CustomerReportInterface";
import CustomerReportService from "@services/backoffice/CustomerReportService";
import { transfromDateString } from "@utils/Helpers";

export default function ReporterDetail() {
  const reporter = CustomerReportService.getter<ReporterInterface>("reporter");
  return (
    <Box>
      <Header>Reporter</Header>
      <Content>
        <Text>
          Id: <b>{reporter.id}</b>
        </Text>
        <Text>
          Email: <b>{reporter.email}</b>
        </Text>
        <Text>
          Name:&nbsp;
          <b>
            {reporter.first_name} {reporter.last_name} ({reporter.nick_name})
          </b>
        </Text>

        <Text>
          Created At: <b>{transfromDateString(reporter.created_at)}</b>
        </Text>
      </Content>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  color: #000000;
  background-color: #fff;

  margin-top: 20px;
`;

const Header = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  background-color: #505050;

  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const Content = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(252, 252, 252, 1);

  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  display: grid;
  grid-template-columns: 1fr 1fr;

  user-select: text;
`;

const Text = styled.div`
  font-size: 16px;
  color: #000;
  margin-top: 5px;
`;
