//<---------- import modules ---------->
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import Publish from "../../Header/Navigation/ContributorNavigations/Publish";
import PreviewStory from "./PreviewStory";
import StoryTextArea from "./StoryTextArea";
import StoryTitleTagsCoverImage from "./StoryTitleTagsCoverImage";
import ViewPreview from "./ViewPreview";
import Settings from "./Settings";
import styles from "./NewStory.module.css";
import PreviewHeader from "./PreviewHeader";
import { useParams } from "react-router-dom";

const NewStory = () => {
  const { storyId } = useParams();

  const {
    history,
    newStory,
    newStory: {
      viewPreview,
      title,
      value,
      pageSettings: { isAutoPreviewEnabled },
    },
    onMakeBodyFixed,
  } = useContext(AuthContext);

  //<---------- USE EFFECTS STARTS HERE
  //<---------- use effect for handling when the browser is to be refreshed at the new story page -------->
  useEffect(() => {
    if (
      history.location.pathname.startsWith(`/story/${newStory.temporaryId}/edit`) &&
      (newStory.title || newStory.coverImage || newStory.value)
    ) {
      //<--------- function for displaying the window dialog box --------->
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        event.returnValue = "";
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      //<--------- cleanup ---------->
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [history, newStory]);

  //<---------- use effect for redirecting back to the new story page if the temporary identifier is invalid-------->
  useEffect(() => {
    if (storyId) {
      if (storyId !== newStory.temporaryId) {
        history.push(`/new-story`);
      }
    }
  }, [history, storyId, newStory.temporaryId]);
  //<---------- USE EFFECTS ENDS HERE
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
        {(isAutoPreviewEnabled || viewPreview) && (
          <PreviewHeader title={title} value={value} onMakeBodyFixed={onMakeBodyFixed} />
        )}
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
