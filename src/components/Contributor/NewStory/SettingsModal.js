import { useCallback, useContext, useState } from "react";
import styles from "./SettingsModal.module.css";
import { AuthContext } from "../../../store/Auth/auth-context";
const SettingsModal = () => {
  const {
    appMode: { NewStorySettings },
    changeAppMode,
  } = useContext(AuthContext);
  const [settingStates, setSettingStates] = useState(
    NewStorySettings ? NewStorySettings : { autoPreview: true }
  );
  const saveChangesHandler = useCallback(() => {
    //----------> if no the auto preview data was not changed
    if (NewStorySettings.autoPreview === settingStates.autoPreview) {
      return;
    }
    changeAppMode({ NewStorySettings: settingStates });
  }, [settingStates, NewStorySettings, changeAppMode]);

  return (
    <div className={styles["settings-modal"]} onClick={(event) => event.stopPropagation()}>
      <ul className={styles["settings-list"]}>
        <li>
          <input
            type="checkbox"
            id="auto-preview"
            // If auto preview is true, then we make the input unchecked
            checked={NewStorySettings.autoPreview ? !settingStates.autoPreview : settingStates.autoPreview}
            onChange={(event) => {
              setSettingStates((prevState) => {
                return { ...prevState, autoPreview: !prevState.autoPreview };
              });
            }}
          />
          <label htmlFor="auto-preview">
            {NewStorySettings.autoPreview ? "Disable Auto-Preview" : "Enable Auto-Preview"}
          </label>
        </li>
      </ul>
      <button onClick={saveChangesHandler}>Save Changes</button>
    </div>
  );
};

export default SettingsModal;
