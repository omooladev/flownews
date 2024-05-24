import styles from "./SettingsModal.module.css";
const SettingsModal = () => {
  return (
    <div className={styles["settings-modal"]}>
      <ul className={styles["settings-list"]} onClick={(event) => event.stopPropagation()}>
        <li>
          <input type="checkbox" id="auto-preview" />
          <label htmlFor="auto-preview">Disable Auto-Preview</label>
        </li>
      </ul>
      <button>Save Changes</button>
    </div>
  );
};

export default SettingsModal;
