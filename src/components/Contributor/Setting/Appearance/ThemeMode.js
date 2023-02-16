import { useContext } from "react";
import { AppContext } from "../../../../store/App/app-context";
import Card from "../../../../UI/Card";
import styles from "./ThemeMode.module.css";
import LightDefaultMode from "../../../../assets/light_preview.svg";
import DarkDefaultMode from "../../../../assets/dark_preview.svg";
import { useState } from "react";

const ThemeMode = () => {
  const {
    appMode: { display },
  } = useContext(AppContext);
  const [mode, setMode] = useState(display);
  console.log(mode);
  const themes = [
    {
      name: "Light Default",
      image: LightDefaultMode,
      modeName: mode === "light-default-theme" ? styles.lightMode : "",
      active: mode === "light-default-theme" ? styles.active : "",
      checked: mode === "light-default-theme",
    },
    {
      name: "Dark Default",
      image: DarkDefaultMode,
      modeName: mode === "dark-default-theme" ? styles.darkMode : "",
      active: mode === "dark-default-theme" ? styles.active : "",
      checked: mode === "dark-default-theme",
    },
  ];

  const changeModeHandler = (name) => {
    if (name === "Dark Default") {
      setMode("dark-default-theme");
    }
    if (name === "Light Default") {
      setMode("light-default-theme");
    }
  };
  return (
    <>
      <label>Theme Mode</label>
      <form className={styles.theme_mode}>
        {themes.map((theme) => {
          return (
            <Card
              key={theme.name}
              className={`${styles.single_theme} ${theme.modeName} ${theme.active}`}
            >
              <img src={theme.image} alt={theme.name} />
              <hr />
              <div className={styles.theme_details}>
                <input
                  type="radio"
                  value={mode}
                  name="theme-mode"
                  checked={theme.checked}
                  onChange={() => changeModeHandler(theme.name)}
                />
                <label htmlFor="theme-mode">{theme.name}</label>
              </div>
            </Card>
          );
        })}
      </form>
    </>
  );
};

export default ThemeMode;
