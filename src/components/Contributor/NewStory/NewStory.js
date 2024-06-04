//<---------- import modules ---------->
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import Publish from "../../Header/Navigation/ContributorNavigations/Publish";
import PreviewStory from "./PreviewStory";
import StoryTextArea from "./StoryTextArea";
import Settings from "./Settings";
import styles from "./NewStory.module.css";
import StoryTitleTagsCoverImage from "./StoryTitleTagsCoverImage";

const NewStory = () => {
  const {
    newStory: {
      pageSettings: { isAutoPreviewEnabled },
    },
  } = useContext(AuthContext);

  return (
    <section className={`${styles["new-story-section"]} ${isAutoPreviewEnabled && styles["previewed"]}`}>
      <div className={styles["header"]}>
        <h1>Create Story</h1>
        {!isAutoPreviewEnabled && (
          <button type="button" className={styles["view-preview-button"]}>
            View Preview
          </button>
        )}
      </div>
      <StoryTitleTagsCoverImage isAutoPreviewEnabled={isAutoPreviewEnabled} />
      <section className={styles["story-area"]}>
        <StoryTextArea />
        {isAutoPreviewEnabled && <PreviewStory />}
      </section>

      <div className={styles.footer}>
        <Publish className={styles.publish} />
        <button type="button" className={styles["save-draft-button"]}>Save draft</button>
        <Settings />
      </div>
      <div className={styles.guides}>
        <Link to="/guide-to-posting">How to publish like a Pro: A Guide to Posting Your Story</Link>
      </div>
    </section>
  );
};

export default NewStory;
