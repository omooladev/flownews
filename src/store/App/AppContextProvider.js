import { useCallback, useEffect, useState } from "react";
import { AppContext } from "./app-context";
const getAppMode = () => {
  const appMode = localStorage.getItem("flownews-mode");
  if (appMode) {
    return JSON.parse(appMode);
  }
  return {};
};

const AppContextProvider = (props) => {
  //* check the default browser theme
  const browserDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const browserLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
  //* states
  const [appMode, setAppMode] = useState(getAppMode);
  const [componentsIsActive, setComponentsIsActive] = useState({
    menuIsActive: false,
    profileBoxIsActive: false,
    searchFieldIsActive: false,
  });

  const [lastLocation, setLastLocation] = useState("");

  const changeAppMode = useCallback((properties) => {
    setAppMode((prevMode) => {
      return { ...prevMode, ...properties };
    });
  }, []);

  const toggleComponentsIsActive = useCallback(({ type, event }) => {
    if (event === "close") {
      const component = `${type}IsActive`;
      return setComponentsIsActive((prevState) => {
        return { ...prevState, [component]: false };
      });
    }
    if (event === "toggle") {
      const component = `${type}IsActive`;
      return setComponentsIsActive((prevState) => {
        const {} = prevState;
        prevState.map((state) => {
          console.log(state);
        });
        return { ...prevState };
      });
    }
  }, []);

  useEffect(() => {
    if (browserLightTheme || appMode.theme === "light-default") {
      document.body.classList.remove("dark");
      changeAppMode({ theme: "light-default" });
    }
    if (browserDarkTheme || appMode.theme === "dark-default") {
      document.body.classList.add("dark");
      changeAppMode({ theme: "dark-default" });
    }
  }, [browserDarkTheme, browserLightTheme, changeAppMode, appMode.theme]);

  useEffect(() => {
    if (appMode) {
      return localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode }));
    }
  }, [appMode]);
  return (
    <AppContext.Provider
      value={{
        appMode,
        onChangeAppMode: changeAppMode,
        lastLocation,
        onSetLastLocation: (location) => {
          setLastLocation(location);
        },
        componentsIsActive,
        onToggleComponentsIsActive: toggleComponentsIsActive,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
