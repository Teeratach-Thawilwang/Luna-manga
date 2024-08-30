import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import {
  ChapterCommentInterface,
  ChapterCommentParams,
  ChapterCommentReactionParams,
  ChapterCommentSliceInterface,
  CreateCommentParams,
  DeleteCommentParams,
} from "@interfaces/ChapterCommentInterface";
import { PaginationInterface } from "@interfaces/PaginationInterface";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import ChapterCommentApi from "@repositories/ChapterCommentApi";
import AuthService from "@services/AuthService";
import store, { useAppSelector } from "@store/Store";
import { deleteCommentById, pushData, pushDataAtBegin, update, updateReaction } from "@store/slices/ChapterCommentSlice";
import { navigateTo } from "@utils/Helpers";

class ChapterCommentService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, is_loading: false, error: "" }));
  }

  public getState(): ChapterCommentSliceInterface {
    return useAppSelector((state) => state.chapterComment, shallowEqual);
  }

  public getComments(): ChapterCommentInterface[] {
    return useAppSelector((state) => state.chapterComment.data, shallowEqual);
  }

  public getCommentCount(): number {
    return useAppSelector((state) => state.chapterComment.paginate?.total ?? 0, shallowEqual);
  }

  public getCommentIsLoading(): boolean {
    return useAppSelector((state) => state.chapterComment.is_loading, shallowEqual);
  }

  public getCommentIsLoaded(): boolean {
    return useAppSelector((state) => state.chapterComment.paginate != null, shallowEqual);
  }

  public getCommentPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.chapterComment.paginate, shallowEqual);
  }

  public getCommentCurrentPage(): number {
    return useAppSelector((state) => state.chapterComment.paginate?.current ?? 1, shallowEqual);
  }

  public getCommentError(): string {
    return useAppSelector((state) => state.chapterComment.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public pushComment(data: ChapterCommentInterface): void {
    store.dispatch(pushData(data));
  }

  public loadIndex(chapterId: number, page: number = 1, perPage: number = 15): void {
    store.dispatch(update({ is_loading: true }));

    const params: ChapterCommentParams = {
      chapter_id: chapterId,
      page: page,
      per_page: perPage,
    };

    ChapterCommentApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(pushData({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadIndex(chapterId, page, perPage);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public createComment(chapterId: number, customerId: number, message: string): void {
    const params: CreateCommentParams = {
      chapter_id: chapterId,
      customer_id: customerId,
      message: message,
    };

    ChapterCommentApi.createComment(params)
      .then((response) => {
        store.dispatch(pushDataAtBegin({ data: [response] }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createComment(chapterId, customerId, message);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public delete(chapterId: number, commentId: number): void {
    const params: DeleteCommentParams = {
      chapter_id: chapterId,
      comment_id: commentId,
    };

    ChapterCommentApi.delete(params)
      .then((_response) => {
        toast.success("ลบความคิดเห็นเเล้ว");
        store.dispatch(deleteCommentById({ id: commentId }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.delete(chapterId, commentId);
            });
            break;
          default:
            store.dispatch(update({ error: e.data }));
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public reaction(customerId: number, commentId: number, like?: number, dislike?: number) {
    const params: ChapterCommentReactionParams = {
      customer_id: customerId,
      comment_id: commentId,
    };

    if (like != undefined) {
      params["like"] = like;
    }

    if (dislike != undefined) {
      params["dislike"] = dislike;
    }

    ChapterCommentApi.reaction(params)
      .then((response) => {
        const data = { commentId: params.comment_id, reaction: { ...response } };
        store.dispatch(updateReaction(data));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.reaction(customerId, commentId, like, dislike);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new ChapterCommentService();
