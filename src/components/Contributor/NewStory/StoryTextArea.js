//<---------- import modules ---------->
import { useContext, useState } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import MDEditor from "@uiw/react-md-editor";
import styles from "./StoryTextArea.module.css";

const StoryTextArea = () => {
  const {
    appMode: { theme },
    newStory,
    onUpdateNewStory,
  } = useContext(AuthContext);

  return (
    <div className={styles["story-text-area"]}>
      <MDEditor
        className={styles.editor}
        value={newStory.value}
        onChange={(value) => onUpdateNewStory({ value })}
        data-color-mode={theme.includes("light") ? "light" : "dark"}
      />
    </div>
  );
};

export default StoryTextArea;
