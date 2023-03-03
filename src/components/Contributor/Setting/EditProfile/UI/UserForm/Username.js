import { useCallback, useState } from "react";
import styles from "./UserForm.module.css";
const Username = (props) => {
  let { username, onGetValue } = props;
  const [newUsername, setNewUsername] = useState(username);

  const changeUsernameHandler = useCallback(
    (event) => {
      setNewUsername((prevValue) => {
        return event.target.value;
      });
      onGetValue({ type: "username", value: event.target.value.trim() });
    },
    [onGetValue]
  );

  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__username">Username</label>
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
