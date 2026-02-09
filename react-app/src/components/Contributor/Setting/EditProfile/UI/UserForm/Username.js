import { useCallback, useRef, useState } from "react";
import { configuration } from "../../../../../../config";
import styles from "./UserForm.module.css";
const Username = ({ username, onGetValue, onSetFormValidity, onCheckFieldExistence }) => {
  //<---------- STATES --------->
  const [newUsername, setNewUsername] = useState(username);
  const [newUsernameError, setNewUsernameError] = useState("");
  let timeOutId = useRef();
  //<---------- FUNCTION FOR VALIDATING USERNAME AND CHECKING ITS AVAILABILITY ---------->
  const validateUserName = useCallback(
    async (usernameInput) => {
      const usernameLength = username.length;
      const newUsername = usernameInput.trim();
      const oldUsername = username.trim();
      if (newUsername === oldUsername) {
        //----------> If the username entered in the input is the same as your current username, then it is still valid
        onSetFormValidity({ type: "username", isValid: true });
        return setNewUsernameError("");
      }
      if (usernameLength === 0) {
        //----------> update the form validity state
        onSetFormValidity({ type: "username", isValid: false });
        return setNewUsernameError("Username is required. Please provide a username.");
      }
      if (usernameLength < 9) {
        onSetFormValidity({ type: "username", isValid: false });
        return setNewUsernameError("username cannot be less than 9 characters");
      }
      if (usernameLength > 11) {
        onSetFormValidity({ type: "username", isValid: false });
        return setNewUsernameError("username cannot be greater than 11 characters");
      }
      //<---------SEND A REQUEST FOR CONFIRMING IF THE USERNAME CHOSEN ALREADY EXIST ------------>
      const response = await onCheckFieldExistence({ name: "username", value: usernameInput });
      if (response.hasError) {
        onSetFormValidity({ type: "username", isValid: false });
        return setNewUsernameError(response.error);
      }
      if (response.usernameExist) {
        onSetFormValidity({ type: "username", isValid: false });
        return setNewUsernameError("That username has been taken. Please choose another");
      }
      onSetFormValidity({ type: "username", isValid: true });
      setNewUsernameError("");
    },
    [onSetFormValidity, onCheckFieldExistence, username]
  );
  //<---------- FUNCTION FOR CHANGING USERNAME ---------->
  const changeUsernameHandler = useCallback(
    (event) => {
      setNewUsername((prevValue) => {
        return event.target.value;
      });
      //---------->clear the timeout
      clearTimeout(timeOutId.current);
      //----------> set the timeout
      timeOutId.current = setTimeout(() => {
        const username = event.target.value.trim();
        //----------> SAVE THE USERNAME VALUE
        onGetValue({ type: "username", value: username });
        //--------->VALIDATE TJE USERNAME
        validateUserName(username);
      }, configuration.userFormInputDelay);
    },
    [onGetValue, timeOutId, validateUserName]
  );

  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__username">Username</label>
      {newUsernameError && <p className="error">{newUsernameError}</p>}
      <input
        type="text"
        id="userFormControl__username"
        placeholder="Please enter your username"
        value={newUsername}
        onChange={changeUsernameHandler}
        spellCheck="false"
        className={newUsernameError && styles.error}
        autoComplete="off"
      />
    </div>
  );
};

export default Username;
