import { useCallback, useEffect, useState } from "react";

import { AppContext } from "./app-context";
const getAppMode = () => {
  const appMode = localStorage.getItem("flownews-mode");
  if (appMode) return JSON.parse(appMode);
  return { display: "light" };
};

const AppContextProvider = (props) => {
  const [appMode, setAppMode] = useState(getAppMode);
  const [isSearching, setIsSearching] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
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
    setToggleMenu((prevState) => {
      if (prevState) return !prevState;
    });
    setProfileBoxIsActive((prevState) => {
      return !prevState;
    });
  }, []);

  const toggleMenuHandler = useCallback(() => {
    setIsSearching((prevState) => {
      if (prevState) return !prevState;
    });
    setProfileBoxIsActive((prevState) => {
      if (prevState) return !prevState;
    });
    setToggleMenu((prevState) => {
      return !prevState;
    });
  }, []);

  const closeMenuHandler = useCallback(() => {
    setToggleMenu((prevState) => {
      if (prevState) return false;
      return;
    });
  }, []);

  useEffect(() => {
    if (appMode.display === "light") {
      document.body.classList.remove("dark");
      localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode, display: "light" }));
    }
    if (appMode.display === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("flownews-mode", JSON.stringify({ ...appMode, display: "dark" }));
    }
  }, [appMode]);

  return (
    <AppContext.Provider
      value={{
        appMode,
        isSearching,
        toggleMenu,
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
