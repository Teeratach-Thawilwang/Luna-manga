export enum DashboardItemEnum {
  ORDER = "Order",
  VISIT = "Visit", // oauth token count on today
  MANGA_VIEW = "Manga View", // manga view cache - set cache when request chapter
  NOVEL_VIEW = "Novel View", // novel view cache - set cache when request chapter
  NEW_CUSTOMER = "New Customer", // customer created_at today
  STORY_REPORT = "Story Report", // customer report source story count on today
  CHAPTER_REPORT = "Chapter Report", // customer report source chapter count on today
  POST_REPORT = "Post Report", // customer report source post count on today
  COMMENT_REPORT = "Comment Report", // customer report source comment count on today
}
