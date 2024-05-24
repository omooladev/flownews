//<---------- import modules ---------->
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import Publish from "../../Header/Navigation/ContributorNavigations/Publish";
import styles from "./NewStory.module.css";
import PreviewStory from "./PreviewStory";
import StoryTextArea from "./StoryTextArea";
import Settings from "./Settings";

const NewStory = () => {
  const { newStory } = useContext(AuthContext);
  //TODO---------->contributor would be able to preview their story before publish
  //TODO----------> keyword and titles must be included
  return (
    <section className={styles["new-story-section"]}>
      <div className={styles["header"]}>
        <h1>Create Story</h1>
        <button type="button">View Preview</button>
      </div>
      <div>
        <button type="button">Add a cover image</button>
      </div>
      <section className={styles["story-area"]}>
        <StoryTextArea />
        <PreviewStory />
      </section>

      <div className={styles.footer}>
        <Publish className={styles.publish} />
        <button type="button">Save draft</button>
        <Settings />
      </div>
      <div>
        <p>Publish Like a Pro: A Guide to Posting Your Story</p>
      </div>
    </section>
  );
};

export default NewStory;
