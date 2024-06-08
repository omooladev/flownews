import { useCallback, useState } from "react";
import { BsArrowsFullscreen } from "react-icons/bs";
import styles from "./PreviewHeader.module.css";
import PreviewStoryFullScreen from "./PreviewStoryFullScreen";

const PreviewHeader = ({ title, value, onMakeBodyFixed }) => {
  const [previewStoryFullScreen, setPreviewStoryFullScreen] = useState(false);
  const toggleFullScreenHandler = useCallback(
    (bool) => {
      setPreviewStoryFullScreen((prevState) => {
        return bool;
      });
      onMakeBodyFixed(bool);
    },
    [onMakeBodyFixed]
  );
  return (
    <div className={styles["preview-header"]}>
      <div className={styles["text-icon"]}>
        <h1>Live Preview</h1>
        {title && value && (
          <BsArrowsFullscreen
            title="view fullscreen"
            className={styles.icon}
            onClick={() => toggleFullScreenHandler(true)}
          />
        )}
      </div>
      <hr />
      {previewStoryFullScreen && title && value && (
        <PreviewStoryFullScreen onToggleFullScreen={toggleFullScreenHandler} />
      )}
    </div>
  );
};

export default PreviewHeader;
