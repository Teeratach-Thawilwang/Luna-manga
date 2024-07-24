import { useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";

import ToggleSwitch from "@components/backoffice/ToggleSwitch";
import CustomerReportService from "@services/backoffice/CustomerReportService";

export default function InputIsAccept() {
  const { id } = useParams();
  const isAccept = CustomerReportService.getter<boolean>("is_accept");
  const acceptBy = CustomerReportService.getter<string>("accept_by");
  const [isChecked, setIsChecked] = useState<boolean>(isAccept);

  function onChangeHandle() {
    setIsChecked((prev) => !prev);
    CustomerReportService.updateCustomerReport(Number(id!), !isChecked);
  }
  return (
    <Box>
      <Header>Acception</Header>
      <Content>
        <Flex>
          <Text>รับเรื่อง:</Text>
          <Wrap>
            <ToggleSwitch height={20} width={50} checked={isChecked} onChange={onChangeHandle} />
          </Wrap>
        </Flex>
        <Flex>
          <Text>ผู้รับเรื่อง: {acceptBy}</Text>
        </Flex>
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
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  background-color: rgba(252, 252, 252, 1);

  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;

  user-select: text;
`;
const Flex = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Text = styled.div`
  font-size: 16px;
  color: #000;
  margin-top: 5px;
`;

const Wrap = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;

  margin-left: 10px;
  margin-right: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
