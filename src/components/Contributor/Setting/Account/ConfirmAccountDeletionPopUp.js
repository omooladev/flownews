import { useCallback, useContext, useEffect, useState } from "react";
import { BiX, BiError } from "react-icons/bi";
import { AuthContext } from "../../../../store/Auth/auth-context";
import PopUp from "../../../../UI/PopUp";
import styles from "./ConfirmAccountDeletionPopUp.module.css";

const ConfirmAccountDeletionPopUp = (props) => {
  const { onSetShowPopUp } = props;
  const {
    userData: { username },
    onMakeBodyFixed,
  } = useContext(AuthContext);
  const [confirmDetails, setConfirmDetails] = useState({ username });
  const closePopUpHandler = useCallback(
    (event) => {
      event.stopPropagation();
      onSetShowPopUp(false);
      onMakeBodyFixed(false);
    },
    [onSetShowPopUp, onMakeBodyFixed]
  );

  useEffect(() => {
    onMakeBodyFixed(true);
  }, [onMakeBodyFixed]);
  return (
    <PopUp className={`auth_popup ${styles.popup}`} onClick={closePopUpHandler}>
      <BiX className={`${styles.icon} ${styles.cancel}`} onClick={closePopUpHandler} />
      <div className={styles.are_you_sure}>
        <p>Are you sure you want to do this?</p>
        <BiX className={`${styles.icon} ${styles.cancel}`} onClick={closePopUpHandler} />
      </div>
      <div className={styles.important}>
        <BiError className={`${styles.icon}`} />
        <p>This is extremely important</p>
      </div>
      <p className={styles.notes}>
        <span>We will immediately delete all of your contents</span>, along with your comments,
        replies and everything associated with your account
      </p>
      <p className={styles.notes}>
        Your username will be available to anyone on FlowNews immediately after account deletion
      </p>
      <form className={styles.form}>
        <div className={styles.form_control}>
          <label>Your username or email</label>
          <input type="text" value={confirmDetails.username} />
        </div>
        <div className={styles.form_control}>
          <label>
            To verify, type <span>delete my account</span> below:
          </label>
          <input type="text" />
        </div>
        <div className={styles.form_control}>
          <label>Confirm your password</label>
          <input type="password" />
        </div>
        <p>Reply will appear here</p>
        <button>Delete this account</button>
      </form>
    </PopUp>
  );
};

export default ConfirmAccountDeletionPopUp;
