//<---------- import modules ---------->
import { Link, useParams } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import Publish from "./Footer/Publish";
import SaveDraft from "./Footer/SaveDraft";
import PreviewStory from "./PreviewStory";
import StoryTextArea from "./StoryTextArea";
import StoryTitleTagsCoverImage from "./StoryTitleTagsCoverImage";
import ViewPreview from "./ViewPreview";
import Settings from "./Footer/Settings";
import styles from "./NewStory.module.css";
import PreviewHeader from "./PreviewHeader";

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

  const [isLoading, setIsLoading] = useState({ source: null });
  //<---------- USE EFFECTS STARTS HERE
  //<---------- use effect for handling when the browser is to be refreshed at the new story page -------->
  useEffect(() => {
    if (
      history.location.pathname.startsWith(`/story/${newStory.storyId}/edit`) &&
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
      if (storyId !== newStory.storyId) {
        history.push(`/new-story`);
      }
    }
  }, [history, storyId, newStory.storyId]);
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
        {isLoading.source === null && <Publish className={styles.publish} />}
        {(isLoading.source === null || isLoading.source === "save-draft") && (
          <SaveDraft
            isLoading={isLoading}
            onSaveIsLoading={(source) => {
              setIsLoading((prevData) => {
                return { ...prevData, source };
              });
            }}
          />
        )}
        {isLoading.source === null && <Settings />}
      </section>
      <section className={styles.guides}>
        <Link to="/guide-to-posting">How to publish like a Pro: A Guide to Posting Your Story</Link>
      </section>
    </section>
  );
};

export default NewStory;
