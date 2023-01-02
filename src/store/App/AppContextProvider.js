import { useCallback, useState } from "react";
import { AppContext } from "./app-context";

const AppContextProvider = (props) => {
  const [appDisplayMode, setAppDisplayMode] = useState("light");
  const [isSearching, setIsSearching] = useState("false");
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


  return (
    <AppContext.Provider
      value={{
        appDisplayMode,
        isSearching,
        onToggleSearch: toggleSearchHandler,
        onchangeAppDisplayMode: changeDisplayMode,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
