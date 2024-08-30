import ReportCommentModal from "@components/tablet/chapterDetail/comment/ReportCommentModal";
import CommentList from "@components/tablet/comment/CommentList";
import { ReactionEnum } from "@enums/ReactionEnum";
import { CommentInterface } from "@interfaces/CommentInterface";
import ChapterCommentService from "@services/ChapterCommentService";
import ChapterService from "@services/ChapterService";
import CustomerProfileService from "@services/CustomerProfileService";

export default function CommentListWrap() {
  const { data: comments, paginate, is_loading: isLoading } = ChapterCommentService.getState();
  const customerId = CustomerProfileService.getCustomerId();
  const chapterId = ChapterService.getChapterId();

  function onSeeMoreClick() {
    ChapterCommentService.loadIndex(chapterId!, paginate!.next!, 10);
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
        ChapterCommentService.reaction(customerId, comment.id, value, undefined);
        break;
      case ReactionEnum.DISLIKE:
        value = is_disliked ? 0 : 1;
        ChapterCommentService.reaction(customerId, comment.id, undefined, value);
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
  return <ReportCommentModal isShow={isShow} commentId={commentId} commenterId={commenterId} setIsShow={setIsShow} />;
}
