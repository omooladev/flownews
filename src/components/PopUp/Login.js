import { useCallback, useContext } from "react";
import { AppContext } from "../../store/App/app-context";
import PopUp from "../../UI/PopUp";
import styles from "./Login.module.css";

const Login = () => {
  const { onPopUp } = useContext(AppContext);
  const closePopUpHandler = useCallback(() => {
    return onPopUp({ state: false, type: "", from: "" });
  }, [onPopUp]);
  return (
    <PopUp onClick={closePopUpHandler} className={`auth_popup ${styles.login}`}>
      <h1>Olawole is a boy</h1>
    </PopUp>
  );
};

export default Login;
