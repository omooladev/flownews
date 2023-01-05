import { useCallback, useEffect, useState } from "react";
import { AppContext } from "./app-context";
const getAppMode = () => {
  const appMode = localStorage.getItem("flownews-mode");

  if (appMode) return JSON.parse(appMode);
  return { display: "light" };
};

const AppContextProvider = (props) => {
  const [appMode, setAppMode] = useState(getAppMode);
  const [popUp, setPopUp] = useState({ state: false, type: "", from: "" });
  const [isSearching, setIsSearching] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  console.log(appMode);
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

  const toggleMenuHandler = useCallback(() => {
    setIsSearching((prevState) => {
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
        popUp,
        onPopUp: (popUpData) => {
          setPopUp((prevState) => {
            return { ...prevState, ...popUpData };
          });
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
