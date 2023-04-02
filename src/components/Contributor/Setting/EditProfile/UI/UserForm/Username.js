import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
const Username = (props) => {
  let { username, onGetValue } = props;
  const [newUsername, setNewUsername] = useState(username);
  const [newUsernameError, setNewUsernameError] = useState("");
  const changeUsernameHandler = useCallback(
    (event) => {
      const usernameLength = event.target.value.trim().length;
      setNewUsername((prevValue) => {
        return event.target.value;
      });
      onGetValue({ type: "username", value: event.target.value.trim() });
      if (usernameLength === 0) {
        return setNewUsernameError("Please provide a valid username");
      }
      if (usernameLength < 9) {
        return setNewUsernameError("username cannot be less than 9 characters");
      }
      if (usernameLength > 11) {
        return setNewUsernameError("username cannot be greater than 11 characters");
      }
      setNewUsernameError("");
    },
    [onGetValue]
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
      />
    </div>
  );
};

export default Username;
