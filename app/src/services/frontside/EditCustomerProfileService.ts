import { shallowEqual } from "react-redux";

import { EditCustomerProfileSliceInterface } from "@interfaces/frontside/EditCustomerProfileInterface";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/frontside/EditCustomerProfileSlice";

class EditCustomerProfileService {
  public clearState() {
    store.dispatch(update({ id: 0, first_name: "", last_name: "", nick_name: "", email: "", editProfileError: "" }));
  }

  public getState(): EditCustomerProfileSliceInterface {
    return useAppSelector((state) => state.frontside.editCustomerProfile, shallowEqual);
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.frontside.editCustomerProfile[key] as T);
  }

  public update(params: any): void {
    store.dispatch(update(params));
  }
}

export default new EditCustomerProfileService();
