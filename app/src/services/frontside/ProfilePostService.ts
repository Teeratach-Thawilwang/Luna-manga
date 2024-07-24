import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { PaginationInterface } from "@interfaces/frontside/PaginationInterface";
import {
  CreateProfilePostParams,
  DeletePostParams,
  ProfilePostInterface,
  ProfilePostParams,
  ProfilePostReactionParams,
  ProfilePostSliceInterface,
} from "@interfaces/frontside/ProfilePostInterface";
import ProfilePostApi from "@repositories/frontside/ProfilePostApi";
import AuthService from "@services/frontside/AuthService";
import store, { useAppSelector } from "@store/Store";
import { deletePostById, pushData, pushDataAtBegin, update, updateReaction } from "@store/slices/frontside/ProfilePostSlice";
import { navigateTo } from "@utils/Helpers";

class ProfilePostService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, is_loading: false, error: "" }));
  }

  public getState(): ProfilePostSliceInterface {
    return useAppSelector((state) => state.frontside.profilePost, shallowEqual);
  }

  public getPosts(): ProfilePostInterface[] {
    return useAppSelector((state) => state.frontside.profilePost.data, shallowEqual);
  }

  public getPostCount(): number {
    return useAppSelector((state) => state.frontside.profilePost.paginate?.total ?? 0, shallowEqual);
  }

  public getPostIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.profilePost.is_loading, shallowEqual);
  }

  public getPostIsLoaded(): boolean {
    return useAppSelector((state) => state.frontside.profilePost.paginate != null, shallowEqual);
  }

  public getPostPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.frontside.profilePost.paginate, shallowEqual);
  }

  public getPostCurrentPage(): number {
    return useAppSelector((state) => state.frontside.profilePost.paginate?.current ?? 1, shallowEqual);
  }

  public getPostError(): string {
    return useAppSelector((state) => state.frontside.profilePost.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public pushPost(data: ProfilePostInterface): void {
    store.dispatch(pushData(data));
  }

  public loadIndex(customerId: number, page: number = 1, orderBy: string = "DESC"): void {
    store.dispatch(update({ is_loading: true }));

    const params: ProfilePostParams = {
      customer_id: customerId,
      per_page: 16,
      page: page,
      order_by: orderBy,
    };

    ProfilePostApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(pushData({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadIndex(customerId, page, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public createPost(customerId: number, message: string): void {
    const params: CreateProfilePostParams = {
      customer_id: customerId,
      message: message,
    };

    ProfilePostApi.createPost(params)
      .then((response) => {
        store.dispatch(pushDataAtBegin({ data: [response] }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.createPost(customerId, message);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public delete(customerId: number, postId: number): void {
    const params: DeletePostParams = {
      customer_id: customerId,
      post_id: postId,
    };

    ProfilePostApi.delete(params)
      .then((_response) => {
        toast.success("ลบโพสเเล้ว");
        store.dispatch(deletePostById({ id: postId }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.delete(customerId, postId);
            });
            break;
          default:
            store.dispatch(update({ error: e.data }));
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public reaction(customerId: number, postId: number, like?: number, dislike?: number): void {
    const params: ProfilePostReactionParams = {
      customer_id: customerId,
      post_id: postId,
    };

    if (like != undefined) {
      params["like"] = like;
    }

    if (dislike != undefined) {
      params["dislike"] = dislike;
    }

    ProfilePostApi.reaction(params)
      .then((response) => {
        const data = { postId: params.post_id, reaction: { ...response } };
        store.dispatch(updateReaction(data));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.reaction(customerId, postId, like, dislike);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new ProfilePostService();
