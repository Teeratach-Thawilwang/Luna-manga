import { SignInSliceInterface } from "@interfaces/backoffice/SignInInterface";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/backoffice/SignInSlice";

class SignInService {
  public getState(): SignInSliceInterface {
    return useAppSelector((state) => state.backoffice.signIn);
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.backoffice.signIn[key]) as T;
  }

  public update(params: any) {
    store.dispatch(update(params));
  }

  public clearState() {
    store.dispatch(
      update({
        email: "",
        password: "",
        loginError: "",
      }),
    );
  }
}

export default new SignInService();
