//<---------- import modules ---------->
import MDEditor from "@uiw/react-md-editor";
import { useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import styles from "./PreviewStory.module.css";
import "./PreviewStory.css";

const PreviewStory = () => {
  const {
    newStory,
    appMode: { theme },
  } = useContext(AuthContext);
  return (
    <div className={styles["preview-area"]}>
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
  );
};

export default PreviewStory;
