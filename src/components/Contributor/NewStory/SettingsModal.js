import { useCallback, useContext, useState } from "react";
import styles from "./SettingsModal.module.css";
import { AuthContext } from "../../../store/Auth/auth-context";
const SettingsModal = () => {
  const { appMode, changeAppMode } = useContext(AuthContext);
  const [settingStates, setSettingStates] = useState({ autoPreview: true });
  const saveChangesHandler = useCallback(() => {
    console.log(settingStates);
  }, [settingStates]);
  return (
    <div className={styles["settings-modal"]} onClick={(event) => event.stopPropagation()}>
      <ul className={styles["settings-list"]}>
        <li>
          <input
            type="checkbox"
            id="auto-preview"
            checked={appMode.NewNoteSettings?.autoPreview || settingStates.autoPreview}
            onChange={(event) => {
              setSettingStates((prevState) => {
                return { ...prevState, autoPreview: !prevState.autoPreview };
              });
            }}
          />
          <label htmlFor="auto-preview">Disable Auto-Preview</label>
        </li>
      </ul>
      <button onClick={saveChangesHandler}>Save Changes</button>
    </div>
  );
};

export default SettingsModal;
