//<---------- import modules ---------->
import { useContext, useState } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import MDEditor from "@uiw/react-md-editor";
import styles from "./StoryTextArea.module.css";

const StoryTextArea = () => {
  const {
    appMode: { theme },
  } = useContext(AuthContext);
  const [value, setValue] = useState("");
  return (
    <div className={styles["story-text-area"]}>
      <MDEditor
        className={styles.editor}
        value={value}
        onChange={setValue}
        data-color-mode={theme.includes("light") ? "light" : "dark"}
      />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap", height: "100%", color: "red" }} />
    </div>
  );
};

export default StoryTextArea;
