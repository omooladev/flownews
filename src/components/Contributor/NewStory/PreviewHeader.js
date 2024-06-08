import { useCallback, useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import styles from "./PreviewHeader.module.css";
import PreviewStoryFullScreen from "./PreviewStoryFullScreen";

const PreviewHeader = () => {
  const [previewStoryFullScreen, setPreviewStoryFullScreen] = useState(false);
  const toggleFullScreenHandler = useCallback((bool) => {
    setPreviewStoryFullScreen((prevState) => {
      return bool;
    });
  }, []);
  return (
    <div className={styles["preview-header"]}>
      <div className={styles["text-icon"]}>
        <h1>Live Preview</h1>
        <BsArrowsFullscreen
          title="view fullscreen"
          className={styles.icon}
          onClick={() => toggleFullScreenHandler(true)}
        />
      </div>
      <hr />
      {previewStoryFullScreen && <PreviewStoryFullScreen onToggleFullScreen={toggleFullScreenHandler} />}
    </div>
  );
};

export default PreviewHeader;
