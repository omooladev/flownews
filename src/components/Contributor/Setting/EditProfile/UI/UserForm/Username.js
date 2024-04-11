import { useCallback, useRef, useState } from "react";
import styles from "./UserForm.module.css";
const Username = (props) => {
  let { username, onGetValue, onSetFormValidity, onCheckFieldExistence } = props;
  const [newUsername, setNewUsername] = useState(username);
  const [newUsernameError, setNewUsernameError] = useState("");
  let timeOutId = useRef();
  const validateUserName = useCallback(
    async (username, usernameLength) => {
      if (usernameLength === 0) {
        //----------> update the form validity state
        onSetFormValidity({ type: "username", isValid: false });
        return setNewUsernameError("Please provide a valid username");
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
      const response = await onCheckFieldExistence({ name: "username", value: username });
      console.log(response);
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
    [onSetFormValidity, onCheckFieldExistence]
  );
  const changeUsernameHandler = useCallback(
    (event) => {
      setNewUsername((prevValue) => {
        return event.target.value;
      });
      //---------->clear the timeout
      clearTimeout(timeOutId.current);
      timeOutId.current = setTimeout(() => {
        const username = event.target.value.trim();
        const usernameLength = username.length;

        onGetValue({ type: "username", value: event.target.value.trim() });
        validateUserName(username, usernameLength);
      }, 300); //0.3s
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
