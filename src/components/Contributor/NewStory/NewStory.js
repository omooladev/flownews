//<---------- import modules ---------->
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import Publish from "../../Header/Navigation/ContributorNavigations/Publish";
import PreviewStory from "./PreviewStory";
import StoryTextArea from "./StoryTextArea";
import StoryTitleTagsCoverImage from "./StoryTitleTagsCoverImage";
import ViewPreview from "./ViewPreview";
import Settings from "./Settings";
import styles from "./NewStory.module.css";
import PreviewHeader from "./PreviewHeader";

const NewStory = () => {
  const {
    newStory: {
      viewPreview,
      pageSettings: { isAutoPreviewEnabled },
    },
  } = useContext(AuthContext);

  return (
    <section
      className={`${styles["new-story-section"]} ${
        (isAutoPreviewEnabled || viewPreview) && styles["previewed"]
      }`}
    >
      <section className={styles["header"]}>
        <h1>Create Story</h1>
        <ViewPreview />
      </section>
      <section className={styles["Story-title-preview-header"]}>
        <StoryTitleTagsCoverImage isAutoPreviewEnabled={isAutoPreviewEnabled} />
        {(isAutoPreviewEnabled || viewPreview) && <PreviewHeader />}
      </section>
      <section className={styles["story-area"]}>
        <StoryTextArea />
        {(isAutoPreviewEnabled || viewPreview) && <PreviewStory />}
      </section>
      <section className={styles.footer}>
        <Publish className={styles.publish} />
        <button type="button" className={styles["save-draft-button"]}>
          Save draft
        </button>
        <Settings />
      </section>
      <section className={styles.guides}>
        <Link to="/guide-to-posting">How to publish like a Pro: A Guide to Posting Your Story</Link>
      </section>
    </section>
  );
};

export default NewStory;
