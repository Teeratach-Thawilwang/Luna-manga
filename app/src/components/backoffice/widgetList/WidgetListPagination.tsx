import styled from "styled-components";

import PaginationTab from "@components/backoffice/PaginationTab";
import WidgetListService from "@services/backoffice/WidgetListService";

export default function WidgetListPagination({ navigatePagination }: { navigatePagination: (page: number) => void }) {
  // console.log("In WidgetListPagination");
  const paginate = WidgetListService.getPaginate();

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
