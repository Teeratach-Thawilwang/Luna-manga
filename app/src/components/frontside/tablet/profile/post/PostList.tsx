import { useParams } from "react-router-dom";

import CommentList from "@components/frontside/tablet/comment/CommentList";
import ReportPostModal from "@components/frontside/tablet/profile/post/ReportPostModal";
import { ReactionEnum } from "@enums/frontside/ReactionEnum";
import { CommentInterface } from "@interfaces/frontside/CommentInterface";
import CustomerProfileService from "@services/frontside/CustomerProfileService";
import ProfilePostService from "@services/frontside/ProfilePostService";

export default function PostList() {
  const { customerId: profileId } = useParams();
  const { data: comments, paginate, is_loading: isLoading } = ProfilePostService.getState();
  const customerId = CustomerProfileService.getCustomerId();

  function onSeeMoreClick() {
    ProfilePostService.loadIndex(Number(profileId), paginate!.next!);
  }

  function onReactionClick(comment: CommentInterface, react: ReactionEnum) {
    if (customerId == null) {
      return;
    }

    let value = 0;
    const { is_liked, is_disliked } = comment.reaction;

    switch (react) {
      case ReactionEnum.LIKE:
        value = is_liked ? 0 : 1;
        ProfilePostService.reaction(customerId, comment.id, value, undefined);
        break;
      case ReactionEnum.DISLIKE:
        value = is_disliked ? 0 : 1;
        ProfilePostService.reaction(customerId, comment.id, undefined, value);
        break;
    }
  }

  return (
    <CommentList
      comments={comments}
      paginate={paginate}
      isLoading={isLoading}
      onSeeMoreClick={onSeeMoreClick}
      onReactionClick={onReactionClick}
      optionModal={optionModal}
    />
  );
}

function optionModal(commentId: number, commenterId: number, isShow: boolean, setIsShow: (value: boolean) => void) {
  return <ReportPostModal isShow={isShow} postId={commentId} posterId={commenterId} setIsShow={setIsShow} />;
}
