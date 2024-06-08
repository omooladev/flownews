import { BsFullscreenExit } from "react-icons/bs";
import MDEditor from "@uiw/react-md-editor";
import styles from "./PreviewStoryFullScreen.module.css";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import StoryTitle from "./UI/StoryTitle";
const PreviewStoryFullScreen = ({ onToggleFullScreen }) => {
  const {
    newStory,
    newStory: { title },
    appMode: { theme },
  } = useContext(AuthContext);

  return (
    <section className={styles["preview-story-fullscreen"]}>
      <div className={`${styles["fullscreen-header-wrapper"]}`}>
        <div className={`wrapper`}>
          <BsFullscreenExit
            title="Exit fullscreen"
            className={styles["fullscreen-exit-icon"]}
            onClick={() => onToggleFullScreen(false)}
          />
          <StoryTitle title={title} />
        </div>
      </div>

      <div className={`wrapper ${styles["preview-story-wrapper"]}`}>
        <MDEditor.Markdown
          data-color-mode={theme.includes("light") ? "light" : "dark"}
          source={newStory.value}
          style={{
            whiteSpace: "pre-wrap",
            height: "100%",
            width: "100%",
            color: "var(--tertiary-color)",
            backgroundColor: "var(--body-color)",
            overflowY: "auto",
          }}
        />
      </div>
    </section>
  );
};

export default PreviewStoryFullScreen;
