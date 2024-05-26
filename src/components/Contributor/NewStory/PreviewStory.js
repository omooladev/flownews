//<---------- import modules ---------->
import MDEditor from "@uiw/react-md-editor";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import styles from "./PreviewStory.module.css";

const PreviewStory = () => {
  const {
    newStory,
    appMode: { theme },
  } = useContext(AuthContext);
  return (
    <div className={styles["preview-area"]}>
      <div className={styles["preview-header"]}>
        <h1>Live Preview</h1>
      </div>
      <hr />
      <MDEditor.Markdown
        data-color-mode={theme.includes("light") ? "light" : "dark"}
        source={newStory.value}
        onScroll={true}
        style={{
          whiteSpace: "pre-wrap",
          height: "40vh",
          color: "var(--tertiary-color)",
          backgroundColor: "var(--body-color)",
          overflowY: "auto",
        }}
      />
    </div>
  );
};

export default PreviewStory;
