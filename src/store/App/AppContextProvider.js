import { useCallback, useEffect, useState } from "react";
import { AppContext } from "./app-context";
const getAppMode = () => {
  const appMode = localStorage.getItem("flownews-mode");
  if (appMode) return JSON.parse(appMode);
  return {};
};

const AppContextProvider = (props) => {
  const browserDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const browserLightTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
  const [appMode, setAppMode] = useState(getAppMode);
  const [isSearching, setIsSearching] = useState(false);
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [profileBoxIsActive, setProfileBoxIsActive] = useState(false);
  const [lastLocation, setLastLocation] = useState("");

  const changeAppDisplayMode = (mode) => {
    setAppMode((prevMode) => {
      return { ...prevMode, display: mode };
    });
  };
  const toggleSearchHandler = useCallback(() => {
    setIsSearching((prevState) => {
      return !prevState;
    });
  }, []);

  const toggleProfileBoxHandler = useCallback(() => {
    setIsSearching((prevState) => {
      if (prevState) return !prevState;
    });
    setMenuIsActive((prevState) => {
      if (prevState) return !prevState;
    });
    setProfileBoxIsActive((prevState) => {
      return !prevState;
    });
  }, []);

  const toggleMenuHandler = useCallback(() => {
    setMenuIsActive((prevState) => {
      return !prevState;
    });
  }, []);

  const closeMenuHandler = useCallback((event) => {
    setMenuIsActive((prevState) => {
      return false;
    });
  }, []);

  useEffect(() => {
    if (browserLightTheme) {
      document.body.classList.remove("dark");
      return localStorage.setItem(
        "flownews-mode",
        JSON.stringify({ ...appMode, display: "light" })
      );
    }
    if (browserDarkTheme) {
      document.body.classList.add("dark");
      return localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode, display: "dark" }));
    }
  }, [browserDarkTheme, browserLightTheme, appMode]);

  return (
    <AppContext.Provider
      value={{
        appMode,
        isSearching,
        menuIsActive,
        lastLocation,
        profileBoxIsActive,
        onToggleProfileBox: toggleProfileBoxHandler,
        onCloseProfileBox: () => {
          setProfileBoxIsActive((prevState) => {
            return false;
          });
        },

        onSetLastLocation: (location) => {
          setLastLocation(location);
        },

        onToggleSearch: toggleSearchHandler,
        onCloseSearch: () => {
          setIsSearching((prevState) => {
            return false;
          });
        },
        onToggleMenu: toggleMenuHandler,
        onCloseMenu: closeMenuHandler,
        onChangeAppDisplayMode: changeAppDisplayMode,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
