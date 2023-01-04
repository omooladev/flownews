import { useCallback, useState } from "react";
import { AppContext } from "./app-context";

const AppContextProvider = (props) => {
  const [appDisplayMode, setAppDisplayMode] = useState("light");
  const [isSearching, setIsSearching] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const changeDisplayMode = (mode) => {
    document.body.classList.toggle("dark");
    setAppDisplayMode((prevMode) => {
      return mode;
    });
  };
  const toggleSearchHandler = useCallback(() => {
    setIsSearching((prevState) => {
      return !prevState;
    });
  }, []);

  const toggleMenuHandler = useCallback(() => {
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

  return (
    <AppContext.Provider
      value={{
        appDisplayMode,
        isSearching,
        toggleMenu,
        onToggleSearch: toggleSearchHandler,
        onToggleMenu: toggleMenuHandler,
        onCloseMenu: closeMenuHandler,
        onchangeAppDisplayMode: changeDisplayMode,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
