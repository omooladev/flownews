import { BsFullscreenExit } from "react-icons/bs";
import { useContext } from "react";
import MDEditor from "@uiw/react-md-editor";
import { AuthContext } from "../../../store/Auth/auth-context";
import styles from "./PreviewStoryFullScreen.module.css";

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
        </div>
      </div>

      <div className={`wrapper ${styles["preview-story-wrapper"]}`}>
        <h1 className={styles.story_title}>{title}</h1>
        <hr />
        <MDEditor.Markdown
          data-color-mode={theme.includes("light") ? "light" : "dark"}
          source={newStory.value}
          style={{
            whiteSpace: "pre-wrap",
            height: "50%",
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
