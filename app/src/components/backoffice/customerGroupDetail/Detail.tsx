import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/customerGroupDetail/FooterControl";
import InputName from "@components/backoffice/customerGroupForm/InputName";
import InputStatus from "@components/backoffice/customerGroupForm/InputStatus";
import CustomerGroupService from "@services/backoffice/CustomerGroupService";

export default function Detail() {
  const customerGroup = CustomerGroupService.getCustomerGroup();

  if (customerGroup == null) {
    return (
      <Box>
        <Header headerTitle="Customer Group Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="Customer Group Detail" />
      <Content>
        <InputName initial={customerGroup.name} />
        <InputStatus initial={customerGroup.status} />
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
