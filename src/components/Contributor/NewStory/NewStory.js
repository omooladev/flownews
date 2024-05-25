//<---------- import modules ---------->
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import Publish from "../../Header/Navigation/ContributorNavigations/Publish";
import styles from "./NewStory.module.css";
import PreviewStory from "./PreviewStory";
import StoryTextArea from "./StoryTextArea";
import Settings from "./Settings";

const NewStory = () => {
  const {
    newStory,
    appMode: {
      NewStorySettings: { autoPreview },
    },
  } = useContext(AuthContext);
  console.log(autoPreview);
  return (
    <section className={`${styles["new-story-section"]} ${autoPreview && styles["previewed"]}`}>
      <div className={styles["header"]}>
        <h1>Create Story</h1>
        <button type="button">View Preview</button>
      </div>
      <div>
        <button type="button">Add a cover image</button>
      </div>
      <section className={styles["story-area"]}>
        <StoryTextArea />
        {autoPreview && <PreviewStory />}
      </section>

      <div className={styles.footer}>
        <Publish className={styles.publish} />
        <button type="button">Save draft</button>
        <Settings />
      </div>
      <div className={styles.guides}>
        <Link to="/guide-to-posting">How to publish like a Pro: A Guide to Posting Your Story</Link>
      </div>
    </section>
  );
};

export default NewStory;
