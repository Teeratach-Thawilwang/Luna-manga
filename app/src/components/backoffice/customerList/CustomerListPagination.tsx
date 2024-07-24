import styled from "styled-components";

import PaginationTab from "@components/backoffice/PaginationTab";
import CustomerListService from "@services/backoffice/CustomerListService";

export default function CustomerListPagination({ navigatePagination }: { navigatePagination: (page: number) => void }) {
  // console.log("In CustomerListPagination");
  const paginate = CustomerListService.getPaginate();

  if (paginate == null) {
    return <></>;
  }

  const paginateProps = {
    ...paginate,
    navigatePagination,
  };

  return (
    <BoxPagination>
      <PaginationTab {...paginateProps} />
    </BoxPagination>
  );
}

const BoxPagination = styled.div`
  /* border: 1px solid red; */
  width: 1000px;
  margin: 20px 0px 20px auto;
`;
