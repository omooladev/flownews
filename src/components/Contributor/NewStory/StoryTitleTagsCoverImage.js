import styles from "./StoryTitleTagsCoverImage.module.css";
const StoryTitleTagsCoverImage = ({ isAutoPreviewEnabled }) => {
  return (
    <section
      className={`${styles["StoryTitle-Tags-CoverImage-section"]} ${
        isAutoPreviewEnabled && styles["previewed"]
      }`}
    >
      <div className={styles["story-title"]}>
        <label className={styles.title}>
          Title<span>*</span>
        </label>
        <input type="text" placeholder="Enter Title Here..." autoCorrect="false" />
      </div>

      <div className={styles["cover-image"]}>
        <label htmlFor="story-cover-image">Add a cover image</label>
        <input type="file" id="story-cover-image" />
      </div>
    </section>
  );
};

export default StoryTitleTagsCoverImage;
