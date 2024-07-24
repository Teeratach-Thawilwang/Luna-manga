import { shallowEqual } from "react-redux";

import { ResponseErrorEnum } from "@enums/ResponseErrorEnum";
import { CategoryTypeEnum } from "@enums/frontside/CategoryTypeEnum";
import { AxiosResponseError } from "@interfaces/ResponseErrorInterface";
import { CategoryIndexParams, CategoryInterface, CategorySliceInterface } from "@interfaces/frontside/CategoryInterface";
import CategoryApi from "@repositories/frontside/CategoryApi";
import AuthService from "@services/frontside/AuthService";
import store, { useAppSelector } from "@store/Store";
import { pushCategories, update } from "@store/slices/frontside/CategorySlice";
import { navigateTo } from "@utils/Helpers";

class CategoryService {
  public clearState() {
    store.dispatch(update({ data: [], type: null, paginate: null, is_loading: false, error: "" }));
  }

  public getState(): CategorySliceInterface {
    return useAppSelector((state) => state.frontside.category, shallowEqual);
  }

  public getCategory(): CategoryInterface[] {
    return useAppSelector((state) => state.frontside.category.data, shallowEqual);
  }

  public getCategoryType(): CategoryTypeEnum {
    return useAppSelector((state) => state.frontside.category.type ?? CategoryTypeEnum.MANGA, shallowEqual);
  }

  public getIsLoading(): boolean {
    return useAppSelector((state) => state.frontside.category.is_loading, shallowEqual);
  }

  public getIsLoaded(): boolean {
    return useAppSelector((state) => state.frontside.category.paginate != null, shallowEqual);
  }

  public getCategoryCurrentPage(): number {
    return useAppSelector((state) => state.frontside.category.paginate?.current ?? 1, shallowEqual);
  }

  public getCategoryError(): string {
    return useAppSelector((state) => state.frontside.category.error, shallowEqual);
  }

  public filterCategoryByType(categories: CategoryInterface[], type: CategoryTypeEnum) {
    return categories.filter((category) => category.type == type);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }

  public pushCategories(data: CategoryInterface): void {
    store.dispatch(pushCategories(data));
  }

  public loadIndex(page: number = 1, perPage: number | string = "all", orderBy?: string): void {
    store.dispatch(update({ is_loading: true }));

    const params: CategoryIndexParams = {
      page: page,
      per_page: perPage,
    };

    if (orderBy != undefined) {
      params["order_by"] = orderBy;
    }

    CategoryApi.index(params)
      .then((response) => {
        const { data, ...paginate } = response;
        const categories = this.reIndexCategory(data);
        store.dispatch(update({ data: categories, paginate: paginate, is_loading: false }));
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

  public reIndexCategory(categories: CategoryInterface[]) {
    const index = categories.findIndex((category) => category.name == "ทั้งหมด");
    if (index > -1) {
      const item = categories.splice(index, 1)[0];
      categories.unshift(item);
    }
    return categories;
  }
}

export default new CategoryService();
