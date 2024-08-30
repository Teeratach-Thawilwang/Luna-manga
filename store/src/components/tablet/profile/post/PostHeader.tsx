import { useParams } from "react-router-dom";

import styled from "styled-components";

import InputCommentBox from "@components/tablet/comment/InputCommentBox";
import CustomerProfileService from "@services/CustomerProfileService";
import ProfilePostService from "@services/ProfilePostService";
import { color, font } from "@utils/Themes";

export default function PostHeader() {
  const { customerId: profileId } = useParams();
  const postCount = ProfilePostService.getPostCount();
  const customerId = CustomerProfileService.getCustomerId();
  const postBox = getPostInputBox(customerId, Number(profileId!));

  return (
    <Box>
      <PostTitle>โพสต์ ({postCount})</PostTitle>
      {postBox}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
`;

const PostTitle = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 50px;

  color: ${(props) => color(props).onSurface};
  font-size: ${(props) => font(props).size.xl};

  display: flex;
  justify-content: start;
  align-items: center;
`;

function getPostInputBox(customerId: number | null, profileId: number) {
  if (customerId != null && customerId == Number(profileId!)) {
    return <InputCommentBox onSubmit={(text) => ProfilePostService.createPost(customerId, text)} />;
  }
  return null;
}
