import styled from "styled-components";

import { PermissionDisplayEnum, PermissionSlugEnum } from "@enums/backoffice/PermissionEnum";
import { PermissionListInterface } from "@interfaces/backoffice/PermissionInterface";
import UserRoleCreateEditService from "@services/backoffice/UserRoleCreateEditService";

export default function PermissionTable({ permissionAll }: { permissionAll: PermissionListInterface[] }) {
  const permissionsState = UserRoleCreateEditService.getter<PermissionListInterface[]>("permissions");
  const permissionsName = Object.values(PermissionDisplayEnum);
  const permissionsSelect = Object.values(PermissionSlugEnum).map((slug, key) => {
    const permissionView = permissionAll.filter((item) => item.name == `${slug}.view`)[0];
    const permissaionManage = permissionAll.filter((item) => item.name == `${slug}.manage`)[0];

    const isViewActive = permissionsState.filter((item) => item.name == `${slug}.view`).length > 0;
    const isManageActive = permissionsState.filter((item) => item.name == `${slug}.manage`).length > 0;

    return {
      name: permissionsName[key],
      slug: slug,
      view: {
        is_active: isViewActive,
        permission: permissionView,
      },
      manage: {
        is_active: isManageActive,
        permission: permissaionManage,
      },
    };
  });

  function onSelectHandle(permission: PermissionListInterface) {
    const isExist = permissionsState.some((perm) => perm.id == permission.id);
    if (isExist) {
      const newPermissions = permissionsState.filter((perm) => perm.id != permission.id);
      UserRoleCreateEditService.update({ permissions: newPermissions });
      return;
    }
    const newPermissions = [...permissionsState, permission];
    UserRoleCreateEditService.update({ permissions: newPermissions });
  }

  return (
    <Box>
      <Table>
        <thead>
          <tr>
            <Th>Permission</Th>
            <Th>View</Th>
            <Th>Manage</Th>
          </tr>
        </thead>
        <Tbody>
          {permissionsSelect.map((permission, key) => (
            <tr key={key}>
              <Td>{permission.name}</Td>
              <Td>
                <CheckBox>
                  <input type="checkbox" checked={permission.view.is_active} onChange={() => onSelectHandle(permission.view.permission)} />
                </CheckBox>
              </Td>
              <Td>
                <CheckBox>
                  <input type="checkbox" checked={permission.manage.is_active} onChange={() => onSelectHandle(permission.manage.permission)} />
                </CheckBox>
              </Td>
            </tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  margin: 20px 0 0 0;

  position: relative;
  z-index: 1;
`;

const Table = styled.table`
  box-sizing: border-box;
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  border: 1px solid #424b51;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  height: 40px;

  font-size: 16px;
  text-align: center;
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  color: #fff;
  background-color: #424b51;
`;

const Td = styled.td`
  /* border: 1px solid #d5d5d5; */
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
  height: 50px;
  max-width: 200px;

  font-size: 16px;
  text-align: center;
  white-space: nowrap; /* ป้องกันขึ้นบรรทัดใหม่ */
  overflow: hidden; /* ทำให้เนื้อหาที่เกินซ่อนไว้ */
  text-overflow: ellipsis;

  color: #000000;
  background-color: #ffffff;
`;

const Tbody = styled.tbody`
  tr {
    border: 1px solid rgba(0, 0, 0, 0.1);

    &:hover {
      td {
        background-color: #f3f3f3;
      }
    }
  }

  td:nth-child(1) {
    /* border: 1px solid red; */
    box-sizing: border-box;
    text-align: left;
    padding-left: 10px;
  }
`;

const CheckBox = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    color-scheme: light;
  }

  &:hover {
    input {
      cursor: pointer;
    }
  }
`;
