import styled from "styled-components";

import CreateButton from "@components/backoffice/userRoleList/CreateButton";

export default function UserRoleFilter() {
  return (
    <Box>
      <Row>
        <CreateButton />
      </Row>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
`;

const Row = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  margin-top: 20px;
`;
