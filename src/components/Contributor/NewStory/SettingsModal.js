//<---------- import modules ---------->
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../store/Auth/auth-context";
import AutoPreview from "./Settings/AutoPreview";
import styles from "./SettingsModal.module.css";

const SettingsModal = () => {
  const {
    changeAppMode,
    newStory,
    newStory: {
      viewPreview,
      pageSettings: { isAutoPreviewEnabled },
    },
    onUpdateNewStory,
  } = useContext(AuthContext);

  //<---------- the states for all the settings ----------->
  const [settingStates, setSettingStates] = useState({
    previewState: { checkbox1: false, checkbox2: false },
  });

  const saveSettingStates = useCallback((data) => {
    return setSettingStates((prevState) => {
      return { ...prevState, ...data };
    });
  }, []);
  //<---------- function for saving the changes made in the settings ---------->
  const saveChangesHandler = useCallback(() => {
    //<---------- validations ---------->
    let propertiesToUpdate = [];
    let isAutoPreviewEnabled;

    //<---------- FOR PREVIEW STATE ---------->
    if (settingStates.previewState.checkbox1 !== false || settingStates.previewState.checkbox2 !== false) {
      isAutoPreviewEnabled = settingStates.previewState.checkbox1 ? false : true;
      propertiesToUpdate.push("pageSettings");
    }
    if (propertiesToUpdate.length === 0) {
      return;
    }
    propertiesToUpdate.push("isAutoPreviewEnabled");

    return onUpdateNewStory({
      ...(propertiesToUpdate.includes("pageSettings") && {
        ...(propertiesToUpdate.includes("isAutoPreviewEnabled") && viewPreview && { viewPreview: false }),
        pageSettings: {
          ...(propertiesToUpdate.includes("isAutoPreviewEnabled") && { isAutoPreviewEnabled }),
        },
      }),
    });
  }, [settingStates, onUpdateNewStory, viewPreview]);

  useEffect(() => {
    //----------> if the page settings is changed, update the app mode
    if (newStory.pageSettings) {
      changeAppMode({ NewStorySettings: newStory.pageSettings });
    }
  }, [newStory, changeAppMode, settingStates]);
  return (
    <div className={styles["settings-modal"]} onClick={(event) => event.stopPropagation()}>
      <ul className={styles["settings-list"]}>
        <AutoPreview
          isAutoPreviewEnabled={isAutoPreviewEnabled}
          settingStates={settingStates}
          onSaveSettingStates={saveSettingStates}
        />
      </ul>
      <button onClick={saveChangesHandler}>Save Changes</button>
    </div>
  );
};

export default SettingsModal;
