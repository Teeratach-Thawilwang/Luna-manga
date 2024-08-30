import { shallowEqual } from "react-redux";

import { ThemeEnum } from "@enums/Theme";
import { ThemeSliceInterface } from "@interfaces/ThemeInterface";
import store, { useAppSelector } from "@store/Store";
import { update } from "@store/slices/ThemeSlice";

class ThemeService {
  public getState(): ThemeSliceInterface {
    return useAppSelector((state) => state.theme, shallowEqual);
  }

  public getTheme(): ThemeEnum | null {
    return useAppSelector((state) => state.theme.theme, shallowEqual);
  }

  public update(theme: ThemeEnum) {
    store.dispatch(update({ theme: theme }));
  }
}

export default new ThemeService();
