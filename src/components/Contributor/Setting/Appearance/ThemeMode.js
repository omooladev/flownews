import { useContext } from "react";
import { AppContext } from "../../../../store/App/app-context";
import Card from "../../../../UI/Card";
import styles from "./ThemeMode.module.css";
import LightDefaultMode from "../../../../assets/light_preview.svg";
import DarkDefaultMode from "../../../../assets/dark_preview.svg";
import { useState } from "react";
import { useCallback } from "react";

const ThemeMode = () => {
  const {
    appMode: { theme },
    onChangeAppMode,
  } = useContext(AppContext);
  const [mode, setMode] = useState(theme);

  const themes = [
    {
      name: "Light Default",
      image: LightDefaultMode,
      modeName: mode === "light-default" ? styles.lightMode : "",
      active: mode === "light-default" ? styles.active : "",
      checked: mode === "light-default",
    },
    {
      name: "Dark Default",
      image: DarkDefaultMode,
      modeName: mode === "dark-default" ? styles.darkMode : "",
      active: mode === "dark-default" ? styles.active : "",
      checked: mode === "dark-default",
    },
  ];

  const changeModeHandler = useCallback(
    (name) => {
      if (name === "Dark Default") {
        setMode("dark-default");
        onChangeAppMode({ theme: "dark-default" });
      }
      if (name === "Light Default") {
        setMode("light-default");
        onChangeAppMode({ theme: "light-default" });
      }
    },
    [onChangeAppMode]
  );

  return (
    <>
      <label className={styles.theme_mode_text}>Theme Mode</label>
      <section className={styles.theme_mode}>
        {themes.map((theme) => {
          return (
            <Card
              key={theme.name}
              className={`${styles.single_theme} ${theme.modeName} ${theme.active}`}
              onClick={() => changeModeHandler(theme.name)}
            >
              <img src={theme.image} alt={theme.name} />
              <hr />
              <div className={styles.theme_details}>
                <input
                  type="radio"
                  value={mode}
                  name="theme-mode"
                  id={theme.name}
                  checked={theme.checked}
                  onChange={() => changeModeHandler(theme.name)}
                />
                <label htmlFor={theme.name}>{theme.name}</label>
              </div>
            </Card>
          );
        })}
      </section>
    </>
  );
};

export default ThemeMode;
