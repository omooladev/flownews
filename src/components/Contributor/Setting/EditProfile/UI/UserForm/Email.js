import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserForm.module.css";
import { configuration } from "../../../../../../config";
const Email = ({ email, emailIsPrivate, onGetValue, onSetFormValidity, onCheckFieldExistence }) => {
  const [newEmail, setNewEmail] = useState(email);
  const [newEmailError, setNewEmailError] = useState("");
  let timeOutId = useRef();
  const validateEmail = useCallback(
    async (emailInput) => {
      const emailLength = emailInput.length;
      const newEmail = emailInput.trim();
      const oldEmail = email.trim();
      if (newEmail === oldEmail) {
        //----------> If the email entered in the input is the same as your current email, then it is still valid
        onSetFormValidity({ type: "email", isValid: true });
        return setNewEmailError("");
      }
      if (emailLength === 0) {
        //----------> update the form validity state
        onSetFormValidity({ type: "email", isValid: false });
        return setNewEmailError("Email is required. Please provide an email");
      }
      if (!emailInput.includes("@")) {
        //----------> update the form validity state
        onSetFormValidity({ type: "email", isValid: false });
        return setNewEmailError("Please provide a valid email address");
      }
      //<---------SEND A REQUEST FOR CONFIRMING IF THE USERNAME CHOSEN ALREADY EXIST ------------>
      const response = await onCheckFieldExistence({ name: "email", value: emailInput });
      if (response.hasError) {
        onSetFormValidity({ type: "email", isValid: false });
        return setNewEmailError(response.error);
      }
      if (response.emailExist) {
        onSetFormValidity({ type: "email", isValid: false });
        return setNewEmailError("That email has been taken. Please choose another");
      }
      onSetFormValidity({ type: "email", isValid: true });
      setNewEmailError("");
    },
    [email, onSetFormValidity, onCheckFieldExistence]
  );
  const changeEmailHandler = useCallback(
    (event) => {
      setNewEmail((prevValue) => {
        return event.target.value;
      });
      //----------> clear the timeout
      clearTimeout(timeOutId.current);

      timeOutId.current = setTimeout(() => {
        const email = event.target.value.trim();
        onGetValue({ type: "email", value: email });
        validateEmail(email);
      }, configuration.userFormInputDelay);
    },
    [onGetValue, validateEmail]
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
