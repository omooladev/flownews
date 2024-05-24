//<----------- import modules ---------->
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../../store/App/app-context";
import { BsGear } from "react-icons/bs";
import styles from "./Settings.module.css";

const Settings = () => {
  const {
    componentsIsActive: { NewStorySettingModalIsActive },
    onToggleComponentsIsActive,
  } = useContext(AppContext);
  const [settingStates, setSettingStates] = useState();
  const toggleNewStorySetting = useCallback(
    (event) => {
      console.log("ola");
      event.stopPropagation();
      onToggleComponentsIsActive({ type: "NewStorySettingModal", event: "toggle" });
    },
    [onToggleComponentsIsActive]
  );
  return (
    <div className={styles.settings}>
      <button
        onClick={toggleNewStorySetting}
        className={`${styles["settings-button"]} ${NewStorySettingModalIsActive ? styles.active : ""}`}
      >
        <BsGear onClick={toggleNewStorySetting} />
      </button>
      {NewStorySettingModalIsActive && (
        <>
          <div className={styles["settings-modal"]}>
            <ul className={styles["settings-list"]} onClick={(event) => event.stopPropagation()}>
              <li>
                <input type="checkbox" id="auto-preview" />
                <label htmlFor="auto-preview">Disable Auto-Preview</label>
              </li>
            </ul>
            <button>Save Changes</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
