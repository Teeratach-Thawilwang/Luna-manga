import { useEffect } from "react";

import styled from "styled-components";

import PermissionTable from "@components/backoffice/userRoleForm/PermissionTable";
import { PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import PermissionListService from "@services/backoffice/PermissionListService";
import UserRoleCreateEditService from "@services/backoffice/UserRoleCreateEditService";

export default function InputPermisisons({ initial }: { initial?: PermissionListInterface[] }) {
  const permissionsAll = PermissionListService.getData();
  const errorMessage = UserRoleCreateEditService.getter<string>("permissions_error_message");
  const errorMessageElement = getErrorMessageElement(errorMessage);

  useEffect(() => {
    if (initial) {
      UserRoleCreateEditService.update({ permissions: initial });
    }
  }, []);

  return (
    <Box>
      <PermissionTable permissionAll={permissionsAll} />
      {errorMessageElement}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;

  /* margin-top: 20px; */
`;

const ErrorMessage = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  margin-top: 5px;

  font-size: 16px;
  color: #ff0000;
`;

function getErrorMessageElement(error: string) {
  if (error == "") {
    return null;
  }
  return <ErrorMessage>{error}</ErrorMessage>;
}
