const backofficePrefix = "/backoffice";

export enum GroupSettingEnum {
  DASHBOARD = "dashboard",
  MANGA = "manga",
  NOVEL = "novel",
  CHAPTER_MANGA = "chapter_manga",
  CHAPTER_NOVEL = "chapter_novel",
  CATEGORY = "category",
  CUSTOMER_LIST = "customer_list",
  CUSTOMER_GROUP = "customer_group",
  USER_LIST = "user_list",
  USER_ROLE = "user_role",
  BANNER = "banner",
  WIDGET_LIST = "widget_list",
  WIDGET_SEQUENCE = "widget_sequence",
  CUSTOMER_REPORT = "customer_report",
}

export enum GroupSettingUrlEnum {
  DASHBOARD = `${backofficePrefix}`,
  MANGA = `${backofficePrefix}/stories/manga`,
  NOVEL = `${backofficePrefix}/stories/novel`,
  CHAPTER_MANGA = `${backofficePrefix}/chapters/manga`,
  CHAPTER_NOVEL = `${backofficePrefix}/chapters/novel`,
  CATEGORY = `${backofficePrefix}/categories`,
  CUSTOMER_LIST = `${backofficePrefix}/customers`,
  CUSTOMER_GROUP = `${backofficePrefix}/customer-groups`,
  USER_LIST = `${backofficePrefix}/users`,
  USER_ROLE = `${backofficePrefix}/user-roles`,
  BANNER = `${backofficePrefix}/banners`,
  WIDGET_LIST = `${backofficePrefix}/widgets`,
  WIDGET_SEQUENCE = `${backofficePrefix}/widget-sequence`,
  CUSTOMER_REPORT = `${backofficePrefix}/customer-reports`,
}

export enum GroupSettingNameEnum {
  DASHBOARD = "Dashboard",
  MANGA = "Manga",
  NOVEL = "Novel",
  CATEGORY = "Category",
  CHAPTER_MANGA = "Manga",
  CHAPTER_NOVEL = "Novel",
  CUSTOMER_LIST = "Customer List",
  CUSTOMER_GROUP = "Customer Group",
  USER_LIST = "User List",
  USER_ROLE = "Role",
  BANNER = "Banner",
  WIDGET_LIST = "Widget List",
  WIDGET_SEQUENCE = "Widget Sequence",
  CUSTOMER_REPORT = "Customer Report",
  FRONT_SIDE = "Front Side",
}
