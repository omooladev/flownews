//<---------- IMPORT MODULES ---------->
import { useCallback, useContext, useEffect, useState } from "react";
import { BiX, BiError } from "react-icons/bi";
import { AuthContext } from "../../../../store/Auth/auth-context";
import PopUp from "../../../../UI/PopUp";
import styles from "./ConfirmAccountDeletionPopUp.module.css";

const ConfirmAccountDeletionPopUp = (props) => {
  const { onSetShowPopUp } = props;
  const {
    contributorData: { username },
    onMakeBodyFixed,
  } = useContext(AuthContext);
  const [details, setDetails] = useState({ username });
  const [detailsIsValid, setDetailsIsValid] = useState(true);
  const closePopUpHandler = useCallback(
    (event) => {
      event.stopPropagation();
      onSetShowPopUp(false);
      onMakeBodyFixed(false);
    },
    [onSetShowPopUp, onMakeBodyFixed]
  );

  const changeValueHandler = useCallback(({ type, value }) => {
    setDetails((prevDetails) => {
      return { ...prevDetails, [type]: value };
    });
  }, []);
  const deleteAccountHandler = useCallback((event) => {
    setDetailsIsValid(false);
    event.preventDefault();
  }, []);

  useEffect(() => {
    onMakeBodyFixed(true);
  }, [onMakeBodyFixed]);
  return (
    <PopUp className={`${styles.popup}`} onClick={closePopUpHandler}>
      <BiX className={`${styles.icon} ${styles.cancel}`} onClick={closePopUpHandler} />

      <div className={styles.important}>
        <BiError className={`${styles.icon}`} />
        <p>This is extremely important</p>
      </div>
      <p className={styles.notes}>
        <span>We will immediately delete all of your contents</span>, along with your comments, replies and
        everything associated with your account
      </p>
      <p className={styles.notes}>
        Your username <span className={styles.username}>{username}</span> will be available to anyone on
        FlowNews immediately after account deletion
      </p>
      <form onSubmit={deleteAccountHandler}>
        <div className={styles.form_control}>
          <label>Your username or email</label>
          <input
            type="text"
            value={details.username}
            onChange={(event) => {
              changeValueHandler({ type: "username", value: event.target.value });
            }}
          />
        </div>
        <div className={styles.form_control}>
          <label>
            To verify, type <span>delete my account</span> below:
          </label>
          <input
            type="text"
            onChange={(event) => {
              changeValueHandler({ type: "verify_text", value: event.target.value });
            }}
          />
        </div>
        <div className={styles.form_control}>
          <label>Confirm your password</label>
          <input
            type="password"
            onChange={(event) => {
              changeValueHandler({ type: "password", value: event.target.value });
            }}
          />
        </div>
        <p>Reply will appear here</p>
        <button type="submit" disabled={!detailsIsValid}>
          Delete this account
        </button>
      </form>
    </PopUp>
  );
};

export default ConfirmAccountDeletionPopUp;
