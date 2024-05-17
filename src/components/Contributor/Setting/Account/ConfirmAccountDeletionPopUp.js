//<---------- IMPORT MODULES ---------->
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { BiX, BiError } from "react-icons/bi";
import { AuthContext } from "../../../../store/Auth/auth-context";
import PopUp from "../../../../UI/PopUp";
import styles from "./ConfirmAccountDeletionPopUp.module.css";

const ConfirmAccountDeletionPopUp = (props) => {
  const history = useHistory();
  const { onSetShowPopUp } = props;
  const {
    changeAppMode,
    contributorData: { username },
    onMakeBodyFixed,
    onDeleteContributorAccount,
    onSaveContributorData,
  } = useContext(AuthContext);

  const userNameOrEmailRef = useRef();
  const verifyRef = useRef();
  const passwordRef = useRef();
  let timeOutId = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: null, text: "" });
  const closePopUpHandler = useCallback(
    (event) => {
      event.stopPropagation();
      onSetShowPopUp(false);
      onMakeBodyFixed(false);
    },
    [onSetShowPopUp, onMakeBodyFixed]
  );
  const validateInput = useCallback((userNameOrEmail, verifyText, password) => {
    let hasError = false;
    let error = "";
    if (!password) {
      hasError = true;
      error = "Please provide your password";
    }
    if (verifyText !== "delete my account") {
      hasError = true;
      error = "Verification text is not valid";
    }
    if (!verifyText) {
      hasError = true;
      error = "Please provide the verification text";
    }
    if (!userNameOrEmail) {
      hasError = true;
      error = "Please provide your username or email";
    }
    return { hasError, error };
  }, []);
  const resetMessage = useCallback(() => {
    return setMessage((prevMessage) => {
      return { type: null, text: "" };
    });
  }, []);
  const deleteAccountHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const userNameOrEmail = userNameOrEmailRef.current.value;
      const verifyText = verifyRef.current.value;
      const password = passwordRef.current.value;
      const validationResult = validateInput(userNameOrEmail, verifyText, password);
      if (validationResult.hasError) {
        return setMessage((prevMessage) => {
          return { type: "error", text: validationResult.error };
        });
      }

      resetMessage();
      setIsLoading((prevState) => true);
      const { data, error, status } = await onDeleteContributorAccount({
        userNameOrEmail,
        verifyText,
        password,
      });
      setIsLoading((prevState) => false);
      if (status === 200 && data) {
        setMessage((prevMessage) => {
          return { type: "success", text: data.message };
        });
        timeOutId.current = setTimeout(() => {
          changeAppMode({}, "reset");
          onSaveContributorData({ username: "" });
          clearTimeout(timeOutId.current);
          history.replace("/home");
        }, 2000);

        //
      }
      if (error) {
        setMessage((prevMessage) => {
          return { type: "error", text: error };
        });
      }
    },
    [
      validateInput,
      resetMessage,
      onDeleteContributorAccount,
      onSaveContributorData,
      changeAppMode,
      timeOutId,
      history,
    ]
  );

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
          <input type="text" ref={userNameOrEmailRef} defaultValue={username} />
        </div>
        <div className={styles.form_control}>
          <label>
            To verify, type <span>delete my account</span> below:
          </label>
          <input type="text" ref={verifyRef} />
        </div>
        <div className={styles.form_control}>
          <label>Confirm your password</label>
          <input type="password" ref={passwordRef} />
        </div>
        {message && <p className={styles[message.type]}>{message.text}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Deleting" : "Delete this account"}
        </button>
      </form>
    </PopUp>
  );
};

export default ConfirmAccountDeletionPopUp;
