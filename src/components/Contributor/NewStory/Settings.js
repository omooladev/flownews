//<----------- import modules ---------->
import { useCallback, useContext } from "react";
import { AppContext } from "../../../store/App/app-context";
import { BsGear } from "react-icons/bs";
import SettingsModal from "./SettingsModal";
import styles from "./Settings.module.css";

const Settings = () => {
  const {
    componentsIsActive: { NewStorySettingModalIsActive },
    onToggleComponentsIsActive,
  } = useContext(AppContext);

  const toggleNewStorySetting = useCallback(
    (event) => {
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
