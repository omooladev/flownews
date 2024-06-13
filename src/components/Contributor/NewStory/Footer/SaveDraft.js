import { useCallback } from "react";
import styles from "./SaveDraft.module.css";
const SaveDraft = ({ isLoading, onSaveIsLoading }) => {
  const saveDraftHandler = useCallback(() => {
    onSaveIsLoading("save-draft");

    console.log("send a request for saving draft");
  }, [onSaveIsLoading]);
  return (
    <button
      type="button"
      className={styles["save-draft-button"]}
      onClick={saveDraftHandler}
      disabled={isLoading.source === "save-draft"}
    >
      {isLoading.source === "save-draft" ? "Saving Draft..." : "Save draft"}
    </button>
  );
};

export default SaveDraft;
