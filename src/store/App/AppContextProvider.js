import { useEffect, useState } from "react";
import { AppContext } from "./app-context";

const AppContextProvider = (props) => {
  const [appDisplayMode, setAppDisplayMode] = useState("light");
  const changeDisplayMode = (mode) => {
    document.body.classList.toggle("dark")
    setAppDisplayMode((prevMode) => {
      return mode;
    });
  };

 
  return (
    <AppContext.Provider
      value={{
        appDisplayMode,
        onchangeAppDisplayMode: changeDisplayMode,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
