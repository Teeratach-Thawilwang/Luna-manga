import styled from "styled-components";

import Header from "@components/backoffice/Header";
import Loading from "@components/backoffice/Loading";
import FooterControl from "@components/backoffice/customerDetail/FooterControl";
import InputProfileImage from "@components/backoffice/customerDetail/InputCoverImage";
import InputCustomerGroup from "@components/backoffice/customerDetail/InputCustomerGroup";
import InputEmail from "@components/backoffice/customerDetail/InputEmail";
import InputFirstName from "@components/backoffice/customerDetail/InputFirstName";
import InputLastName from "@components/backoffice/customerDetail/InputLastName";
import InputNickName from "@components/backoffice/customerDetail/InputNickName";
import InputStatus from "@components/backoffice/customerDetail/InputStatus";
import CustomerService from "@services/backoffice/CustomerService";

export default function Detail() {
  const customer = CustomerService.getCustomer();

  if (customer == null) {
    return (
      <Box>
        <Header headerTitle="Customer Detail" />
        <BoxLoading>
          <Loading color="#000000" />
        </BoxLoading>
      </Box>
    );
  }

  return (
    <Box>
      <Header headerTitle="Customer Detail" />
      <Content>
        <InputProfileImage initial={customer.profile_image[0]} />
        <InputEmail initial={customer.email} />
        <InputNickName initial={customer.nick_name} />
        <InputFirstName initial={customer.first_name} />
        <InputLastName initial={customer.first_name} />
        <InputStatus initial={customer.status} />
        <InputCustomerGroup initial={customer.customer_group} />
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
