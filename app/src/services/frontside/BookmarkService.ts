import { shallowEqual } from "react-redux";
import { toast } from "react-toastify";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { OrderByEnum } from "@enums/frontside/OrderByEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  BookmarkAddParams,
  BookmarkDeleteParams,
  BookmarkIndexParams,
  BookmarkSliceInterface,
  BookmarkStoryInterface,
} from "@interfaces/frontside/BookmarkInterface";
import { PaginationInterface } from "@interfaces/frontside/PaginationInterface";
import BookmarkApi from "@repositories/frontside/BookmarkApi";
import AuthService from "@services/frontside/AuthService";
import StoryService from "@src/services/frontside/StoryService";
import store, { useAppSelector } from "@store/Store";
import { deleteById, pushStory, update } from "@store/slices/frontside/BookmarkSlice";
import { navigateTo } from "@utils/Helpers";

class BookmarkService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, is_loading: false, error: "" }));
  }

  public getState(): BookmarkSliceInterface {
    return useAppSelector((state) => state.frontside.bookmark, shallowEqual);
  }

  public getBookmark(): BookmarkStoryInterface[] {
    return useAppSelector((state) => state.frontside.bookmark.data, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.bookmark.is_loading, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.frontside.bookmark.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.frontside.bookmark.paginate, shallowEqual);
  }

  public getBookmarkCurrentPage(): number {
    return useAppSelector((state) => state.frontside.bookmark.paginate?.current ?? 1, shallowEqual);
  }

  public getTotalBookamrk(): number {
    return useAppSelector((state) => state.frontside.bookmark.paginate?.total ?? 0, shallowEqual);
  }

  public getBookmarkError(): string {
    return useAppSelector((state) => state.frontside.bookmark.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public pushBookmark(data: BookmarkStoryInterface): void {
    store.dispatch(pushStory(data));
  }

  public loadIndex(page: number = 1, perPage: number | string = 8, orderBy: OrderByEnum = OrderByEnum.ASC): void {
    store.dispatch(update({ is_loading: true }));

    const params: BookmarkIndexParams = {
      page: page,
      per_page: perPage,
      order_by: orderBy,
    };

    BookmarkApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadIndex(page, perPage, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: e.data }));
            navigateTo(`/something-went-wrong?data=${JSON.stringify(e.data)}`);
            throw e;
        }
      });
  }

  public addBookmark(storyId: number, customerId: number): void {
    const params: BookmarkAddParams = {
      story_id: storyId,
      customer_id: customerId,
    };

    BookmarkApi.addBookmark(params)
      .then((_response) => {
        toast.success("เพิ่มบุ๊กมาร์คเเล้ว");
        StoryService.updateData({ is_bookmark: true });
        this.clearState();
      })
      .catch((e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.addBookmark(storyId, customerId);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }

  public deleteBookmark(storyId: number, customerId: number): void {
    const params: BookmarkDeleteParams = {
      story_id: storyId,
      customer_id: customerId,
    };

    BookmarkApi.deleteBookmark(params)
      .then((_response) => {
        toast.success("ลบบุ๊กมาร์คเเล้ว");
        store.dispatch(deleteById({ id: storyId }));
        StoryService.updateData({ is_bookmark: false });
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.deleteBookmark(storyId, customerId);
            });
            break;
          default:
            toast.error(String(e.data.error));
            throw e;
        }
      });
  }
}

export default new BookmarkService();
