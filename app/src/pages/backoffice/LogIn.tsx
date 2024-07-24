import styled from "styled-components";

import Detail from "@components/backoffice/login/Detail";

export default function LogIn() {
  // console.log("In LogIn");
  document.title = "Backoffice Luna: Backoffice";

  return (
    <Box>
      <Detail />
    </Box>
  );
}

const Box = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #e7e7e7;
`;
