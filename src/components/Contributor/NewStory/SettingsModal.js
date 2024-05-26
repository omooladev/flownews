//<---------- import modules ---------->
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import styles from "./SettingsModal.module.css";
const SettingsModal = () => {
  const {
    changeAppMode,
    newStory,
    newStory: {
      pageSettings: { isAutoPreviewEnabled },
    },
    onUpdateNewStory,
  } = useContext(AuthContext);

  const [previewState, setPreviewState] = useState({ checkbox1: false, checkbox2: false });

  //<---------- function for saving the changes made in the settings ---------->
  const saveChangesHandler = useCallback(() => {
    onUpdateNewStory({
      pageSettings: {
        isAutoPreviewEnabled: previewState.checkbox1 ? false : previewState.checkbox2 ? true : true,
      },
    });
  }, [previewState, onUpdateNewStory]);

  useEffect(() => {
    //----------> if the page settings is changed, update the app mode
    if (newStory.pageSettings) {
      changeAppMode({ NewStorySettings: newStory.pageSettings });
    }
  }, [newStory, changeAppMode]);
  return (
    <div className={styles["settings-modal"]} onClick={(event) => event.stopPropagation()}>
      <ul className={styles["settings-list"]}>
        <li>
          {isAutoPreviewEnabled && (
            <input
              type="checkbox"
              id="auto-preview-checkbox"
              // If auto preview is true, then we make the input unchecked
              checked={previewState.checkbox1}
              onChange={() =>
                setPreviewState((prevState) => {
                  return { ...prevState, checkbox1: !prevState.checkbox1, checkbox2: false };
                })
              }
            />
          )}
          {!isAutoPreviewEnabled && (
            <input
              type="checkbox"
              id="auto-preview-checkbox"
              // If auto preview is true, then we make the input unchecked
              checked={previewState.checkbox2}
              onChange={() =>
                setPreviewState((prevState) => {
                  return { ...prevState, checkbox2: !prevState.checkbox2, checkbox1: false };
                })
              }
            />
          )}
          <label htmlFor="auto-preview-checkbox">
            {isAutoPreviewEnabled ? "Disable Auto-Preview" : "Enable Auto-Preview"}
          </label>
        </li>
      </ul>
      <button onClick={saveChangesHandler}>Save Changes</button>
    </div>
  );
};

export default SettingsModal;
