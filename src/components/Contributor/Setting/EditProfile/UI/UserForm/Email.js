import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserForm.module.css";
import { configuration } from "../../../../../../config";
const Email = (props) => {
  let { email, emailIsPrivate, onGetValue, onSetFormValidity } = props;
  const [newEmail, setNewEmail] = useState(email);
  const [newEmailError, setNewEmailError] = useState("");
  let timeOutId = useRef();
  const changeEmailHandler = useCallback(
    (event) => {
      const emailIsValid = event.target.value.includes("@");
      setNewEmail((prevValue) => {
        return event.target.value;
      });
      //----------> clear the timeout
      clearTimeout(timeOutId.current);

      timeOutId.current = setTimeout(() => {
        const email = event.target.value.trim();
        onGetValue({ type: "email", value: email });
        //validateEmail(email);
      }, configuration.userFormInputDelay);
      if (!emailIsValid) {
        //----------> update the form validity state
        onSetFormValidity({ type: "email", isValid: emailIsValid });
        return setNewEmailError("Please provide a valid email address");
      }
      //----------> update the form validity state
      onSetFormValidity({ type: "email", isValid: emailIsValid });
      setNewEmailError("");
    },
    [onGetValue, onSetFormValidity]
  );

  return (
    <div className={styles.form_control}>
      <label>Public Email</label>
      {newEmailError && <p className="error">{newEmailError}</p>}
      <input
        type="email"
        placeholder="Please enter your email address"
        value={newEmail}
        onChange={changeEmailHandler}
        required={true}
        spellCheck="false"
        className={newEmailError && styles.error}
      />
      {!emailIsPrivate && (
        <p>
          Your email address is set to public by default. To toggle email privacy, go to
          <Link to="email"> email </Link>
          settings and check "keep my email address private"
        </p>
      )}
      {emailIsPrivate && (
        <p>
          You have set your email address to private. To toggle email privacy, go to
          <Link to="email"> email </Link> settings and uncheck "Keep my email address private."
        </p>
      )}
    </div>
  );
};

export default Email;
