import StoryChapterListItem from "@components/mobile/storyDetail/storyChapterItem/StoryChapterListItem";
import StoryChapterService from "@services/StoryChapterService";

export default function StoryChapterList() {
  const chapters = StoryChapterService.getStoryChapter();
  return chapters.map((chapter) => {
    return <StoryChapterListItem chapter={chapter} key={chapter.id} />;
  });
}
