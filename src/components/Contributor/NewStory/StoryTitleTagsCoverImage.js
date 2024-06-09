import styles from "./StoryTitleTagsCoverImage.module.css";
import CoverImage from "./UI/CoverImage";
import StoryTitle from "./UI/StoryTitle";
const StoryTitleTagsCoverImage = ({ isAutoPreviewEnabled }) => {
  return (
    <section
      className={`${styles["StoryTitle-Tags-CoverImage-section"]} ${
        isAutoPreviewEnabled && styles["previewed"]
      }`}
    >
      <StoryTitle />
      <CoverImage />
    </section>
  );
};

export default StoryTitleTagsCoverImage;
