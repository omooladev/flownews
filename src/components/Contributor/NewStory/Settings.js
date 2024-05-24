//<----------- import modules ---------->
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../../store/App/app-context";
import { BsGear } from "react-icons/bs";
import styles from "./Settings.module.css";
import SettingsModal from "./SettingsModal";

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
      {NewStorySettingModalIsActive && <SettingsModal />}
    </div>
  );
};

export default Settings;
