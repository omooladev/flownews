import { useCallback, useContext } from "react";
import { AppContext } from "../store/App/app-context";
import Routes from "../routes/Routes";

const Main = () => {
  const { onToggleComponentsIsActive } = useContext(AppContext);

  const closeComponentsHandler = useCallback(
    (event) => {
      event.stopPropagation();

      onToggleComponentsIsActive({ event: "*" });
    },
    [onToggleComponentsIsActive]
  );

  return (
    <>
      <main className="main" onClick={closeComponentsHandler}>
        <Routes />
      </main>
    </>
  );
};

export default Main;
