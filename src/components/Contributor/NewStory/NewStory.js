//<---------- import modules ---------->
import { Link } from "react-router-dom";
import { useCallback, useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import Publish from "../../Header/Navigation/ContributorNavigations/Publish";
import PreviewStory from "./PreviewStory";
import StoryTextArea from "./StoryTextArea";
import StoryTitleTagsCoverImage from "./StoryTitleTagsCoverImage";
import Settings from "./Settings";
import styles from "./NewStory.module.css";
import ViewPreview from "./ViewPreview";

const NewStory = () => {
  const {
    newStory: {
      viewPreview,
      pageSettings: { isAutoPreviewEnabled },
    },
    onUpdateNewStory,
  } = useContext(AuthContext);

  const togglePreviewHandler = useCallback(
    (bool) => {
      onUpdateNewStory({ viewPreview: bool });
    },
    [onUpdateNewStory]
  );
  return (
    <section
      className={`${styles["new-story-section"]} ${
        (isAutoPreviewEnabled || viewPreview) && styles["previewed"]
      }`}
    >
      <div className={styles["header"]}>
        <h1>Create Story</h1>
        <ViewPreview
          isAutoPreviewEnabled={isAutoPreviewEnabled}
          togglePreviewHandler={togglePreviewHandler}
          viewPreview={viewPreview}
        />
      </div>
      <section className={styles["Story-title-preview-header"]}>
        <StoryTitleTagsCoverImage isAutoPreviewEnabled={isAutoPreviewEnabled} />
        {(isAutoPreviewEnabled || viewPreview) && (
          <div className={styles["preview-header"]}>
            <h1>Live Preview</h1>
            <hr />
          </div>
        )}
      </section>

      <section className={styles["story-area"]}>
        <StoryTextArea />
        {(isAutoPreviewEnabled || viewPreview) && <PreviewStory />}
      </section>

      <div className={styles.footer}>
        <Publish className={styles.publish} />
        <button type="button" className={styles["save-draft-button"]}>
          Save draft
        </button>
        <Settings />
      </div>
      <div className={styles.guides}>
        <Link to="/guide-to-posting">How to publish like a Pro: A Guide to Posting Your Story</Link>
      </div>
    </section>
  );
};

export default NewStory;
