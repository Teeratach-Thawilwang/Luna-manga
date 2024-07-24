import { styled } from "styled-components";

import CommenterImage from "@components/frontside/tablet/comment/CommenterImage";
import CommenterInfo from "@components/frontside/tablet/comment/CommenterInfo";
import OptionButton from "@components/frontside/tablet/comment/OptionButton";
import { CommentInterface } from "@interfaces/frontside/CommentInterface";
import AuthService from "@services/frontside/AuthService";
import CustomerProfileService from "@services/frontside/CustomerProfileService";

interface CommentItemHeaderInterface {
  comment: CommentInterface;
  optionModal: (commentId: number, commenterId: number, isShow: boolean, setIsShow: (value: boolean) => void) => JSX.Element;
}

export default function CommentItemHeader({ comment, optionModal }: CommentItemHeaderInterface) {
  const isLoggedIn = CustomerProfileService.isLoggedIn() && AuthService.isLogin();
  return (
    <Box>
      <CommenterImage commenter={comment.commenter} />
      <CommenterInfo comment={comment} />
      {isLoggedIn ? <OptionButton comment={comment} optionModal={optionModal} /> : null}
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  width: 100%;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
