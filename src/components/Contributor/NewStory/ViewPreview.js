//<---------- import modules ---------->
import { useCallback, useContext } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import styles from "./NewStory.module.css";

const ViewPreview = () => {
  const {
    newStory: {
      viewPreview,
      pageSettings: { isAutoPreviewEnabled },
    },
    onUpdateNewStory,
  } = useContext(AuthContext);
  const togglePreviewHandler = useCallback(
    (bool) => {
      onUpdateNewStory({ viewPreview: bool });
    },
    [onUpdateNewStory]
  );
  return (
    <>
      {!isAutoPreviewEnabled && (
        <>
          {!viewPreview && (
            <button
              type="button"
              className={styles["view-preview-button"]}
              onClick={() => {
                togglePreviewHandler(true);
              }}
            >
              View Preview
            </button>
          )}
          {viewPreview && (
            <button
              type="button"
              className={styles["view-preview-button"]}
              onClick={() => {
                togglePreviewHandler(false);
              }}
            >
              Hide Preview
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ViewPreview;
