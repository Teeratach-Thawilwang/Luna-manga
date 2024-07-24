import styled from "styled-components";

import { CustomerReportGroupEnum } from "@enums/backoffice/CustomerReportGroupEnum";
import { CustomerReportSourceEnum } from "@enums/backoffice/CustomerReportSourceEnum";
import CustomerReportService from "@services/backoffice/CustomerReportService";
import { transformEnumToWord, transfromDateTimeString } from "@utils/Helpers";

export default function ReportGroup() {
  const group = CustomerReportService.getter<CustomerReportGroupEnum>("group");
  const source = CustomerReportService.getter<CustomerReportSourceEnum>("source");
  const createdAt = CustomerReportService.getter<string>("created_at");
  return (
    <Box>
      <Header>Detail</Header>
      <Content>
        <Text>
          Group: <b>{transformEnumToWord(group)}</b>
        </Text>
        <Text>
          Source: <b>{transformEnumToWord(source)}</b>
        </Text>
        <Text>
          Report At: <b>{transfromDateTimeString(createdAt)}</b>
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
