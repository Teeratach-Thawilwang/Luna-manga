import styled from "styled-components";

import { color } from "@utils/Themes";

export default function FallBack() {
  return <Box></Box>;
}

const Box = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: ${(props) => color(props).surface};
`;
