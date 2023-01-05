import { useCallback, useContext } from "react";
import { AppContext } from "../../store/App/app-context";
import PopUp from "../../UI/PopUp";

const BecomeAContributor = () => {
  const { onPopUp } = useContext(AppContext);
  const closePopUpHandler = useCallback(() => {
    return onPopUp({ state: false, type: "", from: "" });
  }, [onPopUp]);
  return (
    <PopUp onClick={closePopUpHandler}>
      <h1>Olawole is a boy</h1>
    </PopUp>
  );
};

export default BecomeAContributor;
