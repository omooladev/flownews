import styles from "./SaveDraft.module.css";
const SaveDraft = () => {
  return (
    <button type="button" className={styles["save-draft-button"]}>
      Save draft
    </button>
  );
};

export default SaveDraft;
