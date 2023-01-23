import { useContext } from "react";
import { BiMoon, BiSun } from "react-icons/bi";
import { AppContext } from "../../../../store/App/app-context";
import styles from "./DarkLight.module.css";
const DarkLight = () => {
  const {appMode,toggleAppDisplayMode} = useContext(AppContext);
  return (
    <div className={styles.darkLight} onClick={toggleAppDisplayMode}>
      {appMode.display === "light" && <BiMoon className={`${styles.icon} ${styles.moon}`} />}
      {appMode.display === "dark" && <BiSun className={`${styles.icon} ${styles.sun}`} />}
    </div>
  );
};

export default DarkLight;
