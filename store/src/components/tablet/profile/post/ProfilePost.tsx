import styled from "styled-components";

import PostHeader from "@components/tablet/profile/post/PostHeader";
import PostList from "@components/tablet/profile/post/PostList";
import { box } from "@utils/Themes";

export default function ProfilePost() {
  return (
    <Box>
      <PostHeader />
      <PostList />
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  max-width: 1000px;
  margin-top: ${(props) => box(props).space.md};

  position: relative;
`;
