import { useEffect } from "react";

import styled from "styled-components";

import CustomerGroupSearchBox from "@components/backoffice/customerDetail/CustomerGroupSearchBox";
import CustomerGroupTable from "@components/backoffice/customerDetail/CustomerGroupTable";
import { CustomerGroupListInterface } from "@interfaces/backoffice/CustomerGroupInterface";
import CustomerEditService from "@services/backoffice/CustomerEditService";

export default function InputCustomerGroup({ initial }: { initial?: CustomerGroupListInterface }) {
  const customerGroup = CustomerEditService.getter<CustomerGroupListInterface>("customer_group");
  const element = getElement(customerGroup);

  useEffect(() => {
    if (initial) {
      CustomerEditService.update({ customer_group: initial });
    }
  }, []);

  const errorMessage = CustomerEditService.getter<string>("customer_group_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  return (
    <Box>
      <Title>Customer Group</Title>
      {element}
      {errorMessageElement}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 50px;
  font-weight: 500;
  font-size: 20px;
  color: #505050;

  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 5px;

  font-size: 16px;
  color: #ff0000;
`;

function getElement(customerGroup: CustomerGroupListInterface | null) {
  if (customerGroup == null) {
    return <CustomerGroupSearchBox />;
  }

  return <CustomerGroupTable />;
}

function getErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}
