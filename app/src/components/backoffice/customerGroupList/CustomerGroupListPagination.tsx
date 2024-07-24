import styled from "styled-components";

import PaginationTab from "@components/backoffice/PaginationTab";
import CustomerGroupListService from "@services/backoffice/CustomerGroupListService";

export default function CustomerGroupListPagination({ navigatePagination }: { navigatePagination: (page: number) => void }) {
  // console.log("In CustomerGroupListPagination");
  const paginate = CustomerGroupListService.getPaginate();

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
