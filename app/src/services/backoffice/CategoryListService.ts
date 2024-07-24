import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CategoryTypeEnum } from "@enums/backoffice/CategoryTypeEnum";
import { CategoryStatusEnum } from "@enums/backoffice/StatusEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import {
  CategoryListFilterInterface,
  CategoryListInterface,
  CategoryListSliceInterface,
  GetCategoryListParams,
} from "@interfaces/backoffice/CategoryInterface";
import { PaginationInterface } from "@interfaces/backoffice/PaginationInterface";
import CategoryApi from "@repositories/backoffice/CategoryApi";
import AuthService from "@services/backoffice/AuthService";
import store, { useAppSelector } from "@store/Store";
import { deleteById, update, updateFilter } from "@store/slices/backoffice/CategoryListSlice";

class CategoryListService {
  public clearState() {
    store.dispatch(update({ data: [], paginate: null, filter: null, is_loading: false, error: "" }));
  }

  public getState(): CategoryListSliceInterface {
    return useAppSelector((state) => state.backoffice.categoryList, shallowEqual);
  }

  public getData(): CategoryListInterface[] {
    return useAppSelector((state) => state.backoffice.categoryList.data, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.backoffice.categoryList.paginate != null, shallowEqual);
  }

  public getPaginate(): PaginationInterface | null {
    return useAppSelector((state) => state.backoffice.categoryList.paginate, shallowEqual);
  }

  public getFilter(): CategoryListFilterInterface | null {
    return useAppSelector((state) => state.backoffice.categoryList.filter, shallowEqual);
  }

  public getStatus(): CategoryStatusEnum | null {
    return useAppSelector((state) => state.backoffice.categoryList.filter?.status ?? null, shallowEqual);
  }

  public getType(): CategoryTypeEnum | null {
    return useAppSelector((state) => state.backoffice.categoryList.filter?.type ?? null, shallowEqual);
  }

  public getStartDate(): string | null {
    return useAppSelector((state) => state.backoffice.categoryList.filter?.start_date ?? null, shallowEqual);
  }

  public getEndDate(): string | null {
    return useAppSelector((state) => state.backoffice.categoryList.filter?.end_date ?? null, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.backoffice.categoryList.is_loading, shallowEqual);
  }

  public getError(): string {
    return useAppSelector((state) => state.backoffice.categoryList.error, shallowEqual);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public updateFilter(params: any): void {
    store.dispatch(updateFilter(params));
  }

  public deleteById(id: number): void {
    store.dispatch(deleteById({ id: id }));
  }

  public loadCategoryList(
    q?: string,
    status?: CategoryStatusEnum,
    type?: CategoryTypeEnum,
    startDate?: string,
    endDate?: string,
    page: number = 1,
    orderBy: string = "-id",
    perPage: number = 16,
  ): void {
    const params: GetCategoryListParams = {
      page: page,
      per_page: perPage,
      order_by: orderBy,
    };

    if (q != undefined) {
      params["q"] = q;
    }

    if (status != undefined) {
      params["status"] = status;
    }

    if (type != undefined) {
      params["type"] = type;
    }

    if (startDate != undefined) {
      params["start_date"] = startDate;
    }

    if (endDate != undefined) {
      params["end_date"] = endDate;
    }

    store.dispatch(update({ is_loading: true, filter: params }));

    CategoryApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        store.dispatch(update({ data: data, paginate: paginate, is_loading: false }));
      })
      .catch(async (e: AxiosResponseError) => {
        switch (e.data.error) {
          case ResponseErrorEnum.TOKEN_EXPIRED:
            AuthService.getTokenThenCallback(() => {
              this.loadCategoryList(q, status, type, startDate, endDate, page, orderBy);
            });
            break;
          default:
            store.dispatch(update({ is_loading: false, error: JSON.stringify(e.data) }));
            throw e;
        }
      });
  }
}

export default new CategoryListService();
