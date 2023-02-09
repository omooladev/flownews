import { useCallback, useEffect, useState } from "react";

import { AppContext } from "./app-context";
const getAppMode = () => {
  const appMode = localStorage.getItem("flownews-mode");
  if (appMode) return JSON.parse(appMode);
  return {};
};

const AppContextProvider = (props) => {
  const browserTheme = window.matchMedia("(prefers-color-scheme: light)").matches;
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
    setProfileBoxIsActive((prevState) => {
      if (prevState) return !prevState;
    });
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
    console.log(isSearching)
    // setIsSearching((prevState) => {
    //   if (prevState) return !prevState;
    // });
    setProfileBoxIsActive((prevState) => {
      if (prevState) return !prevState;
    });
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
    const browserDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (browserDarkTheme) {
      document.body.classList.add("dark");
      return localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode, display: "dark" }));
    }
    document.body.classList.remove("dark");
    return localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode, display: "light" }));
  }, [browserTheme, appMode]);

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
