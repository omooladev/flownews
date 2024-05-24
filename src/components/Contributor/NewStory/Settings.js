import { BsGear } from "react-icons/bs";
import styles from "./Settings.module.css";
import { useCallback } from "react";
const Settings = () => {
  const toggleNewStorySetting = useCallback(() => {}, []);
  return (
    <div className={styles.settings}>
      <button onClick={toggleNewStorySetting}>
        <BsGear />
      </button>
      <ul>
        <li></li>
      </ul>
    </div>
  );
};

export default Settings;

// --shadow-1: 0 10px 15px -3px rgba(var(--black), 0.5), 0 4px 6px -2px rgba(var(--black), 0.25),
//  inset 0 0 0 1px rgba(var(--white), 0.1);
