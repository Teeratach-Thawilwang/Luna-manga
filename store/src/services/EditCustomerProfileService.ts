import { shallowEqual } from "react-redux";

import { EditCustomerProfileSliceInterface } from "@interfaces/EditCustomerProfileInterface";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/EditCustomerProfileSlice";

class EditCustomerProfileService {
  public clearState() {
    store.dispatch(update({ id: 0, first_name: "", last_name: "", nick_name: "", email: "", editProfileError: "" }));
  }

  public getState(): EditCustomerProfileSliceInterface {
    return useAppSelector((state) => state.editCustomerProfile, shallowEqual);
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.editCustomerProfile[key] as T);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }
}

export default new EditCustomerProfileService();
