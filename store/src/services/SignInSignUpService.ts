import { SignInSignUpFormStateEnum } from "@enums/SignInSignUpFormStateEnum";
import { SignInSignUpSliceInterface } from "@interfaces/SignInSignUpInterface";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/SignInSignUpSlice";

class SignInSignUpService {
  public getState(): SignInSignUpSliceInterface {
    return useAppSelector((state) => state.signInSignUp);
  }

  public getter<T>(key: string): T {
    return useAppSelector((state) => state.signInSignUp[key]) as T;
  }

  public update(params: any) {
    store.dispatch(update(params));
  }

  public setIsShow(isShow: boolean): void {
    store.dispatch(update({ isShow: isShow }));
  }

  public setSelector(selector: string): void {
    store.dispatch(update({ selector: selector }));
  }

  public onClickArea(key: string) {
    store.dispatch(update({ [key]: true }));
  }

  public clearStateArea() {
    store.dispatch(update({ box: false, plane: false }));
  }

  public clearState() {
    store.dispatch(
      update({
        isShow: false,
        plane: false,
        box: false,
        selector: SignInSignUpFormStateEnum.LOGIN,
        email: "",
        firstName: "",
        lastName: "",
        nickName: "",
        password: "",
        confirmPassword: "",
        loginError: "",
        registerError: "",
        forgotPasswordError: "",
      }),
    );
  }
}

export default new SignInSignUpService();
