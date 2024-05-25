import MDEditor from "@uiw/react-md-editor";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import styles from "./PreviewStory.module.css";

const PreviewStory = () => {
  const { newStory } = useContext(AuthContext);
  return (
    <div className={styles["preview-area"]}>
      <MDEditor.Markdown
        source={newStory.value}
        style={{ whiteSpace: "pre-wrap", height: "100%", color: "red" }}
      />
    </div>
  );
};

export default PreviewStory;
