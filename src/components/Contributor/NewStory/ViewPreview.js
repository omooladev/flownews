import styles from "./NewStory.module.css";
const ViewPreview = ({ isAutoPreviewEnabled, togglePreviewHandler, viewPreview }) => {
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
              Remove Preview
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ViewPreview;
