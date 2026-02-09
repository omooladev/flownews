import { useContext } from "react";
import { useState } from "react";
import { useCallback } from "react";
import { AppContext } from "../../../../store/App/app-context";
import { configureAvailableThemes } from "./AvailableThemes";
import Card from "../../../../UI/Card";
import styles from "./ThemeMode.module.css";

const ThemeMode = () => {
  //----------> Access the default value of the theme in the browser from the appMode
  //            object
  const {
    appMode: { theme: defaultTheme },
    onChangeAppMode,
  } = useContext(AppContext);

  const [theme, setTheme] = useState(defaultTheme);

  const changeModeHandler = useCallback(
    (themeName) => {
      if (themeName === "dark-default" || themeName === "light-default") {
        setTheme(themeName);
        return onChangeAppMode({ theme: themeName });
      }
    },
    [onChangeAppMode]
  );

  return (
    <>
      <label className={styles["theme-label"]}>Theme Mode</label>
      <section className={styles["themes-section"]}>
        {configureAvailableThemes(theme).map((theme) => {
          return (
            <Card
              key={theme.name}
              className={`${styles.single_theme} ${
                theme.checked ? styles.active : ""
              }
          `}
              onClick={() => changeModeHandler(theme.themeName)}
            >
              <img src={theme.image} alt={`${theme.name} Theme `} />
              <hr />
              <div className={styles.theme_details}>
                <input
                  type="radio"
                  value={theme.themeName}
                  name="theme"
                  id={theme.themeName}
                  checked={theme.checked}
                  onChange={() => changeModeHandler(theme.themeName)}
                />
                <label htmlFor={theme.themeName}>{theme.name}</label>
              </div>
            </Card>
          );
        })}
      </section>
    </>
  );
};

export default ThemeMode;
