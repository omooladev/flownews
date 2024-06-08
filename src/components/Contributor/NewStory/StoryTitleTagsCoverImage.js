import styles from "./StoryTitleTagsCoverImage.module.css";
import StoryTitle from "./UI/StoryTitle";
const StoryTitleTagsCoverImage = ({ isAutoPreviewEnabled }) => {
  return (
    <section
      className={`${styles["StoryTitle-Tags-CoverImage-section"]} ${
        isAutoPreviewEnabled && styles["previewed"]
      }`}
    >
      <StoryTitle />
      <div className={styles["cover-image"]}>
        <label htmlFor="story-cover-image">Add a cover image</label>
        <input type="file" id="story-cover-image" />
      </div>
    </section>
  );
};

export default StoryTitleTagsCoverImage;
