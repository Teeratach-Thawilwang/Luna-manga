import StoryChapterListItem from "@components/frontside/tablet/storyDetail/storyChapterItem/StoryChapterListItem";
import StoryChapterService from "@services/frontside/StoryChapterService";

export default function StoryChapterList() {
  const chapters = StoryChapterService.getStoryChapter();
  return chapters.map((chapter) => {
    return <StoryChapterListItem chapter={chapter} key={chapter.id} />;
  });
}
