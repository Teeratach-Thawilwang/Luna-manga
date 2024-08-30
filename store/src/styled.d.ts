import "styled-components";

import { ThemeInterface } from "@interfaces/ThemeInterface";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeInterface {}
}
