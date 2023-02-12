import { useCallback, useEffect, useState } from "react";
import styles from "./UserForm.module.css";
const Username = (props) => {
  let { username: user_name, onGetValue } = props;
  const [username, setUsername] = useState("");

  const changeUsernameHandler = useCallback((event) => {
    setUsername((prevValue) => {
      return event.target.value;
    });
  }, []);

  useEffect(() => {
    if (user_name) {
      setUsername((prevValue) => user_name);
    }
  }, [user_name]);
  useEffect(() => {
    if (username) {
      onGetValue({ type: "username", value: username });
    }
  }, [username, onGetValue]);
  return (
    <div className={styles.form_control}>
      <label htmlFor="userFormControl__username">Username</label>
      <input
        type="text"
        id="userFormControl__username"
        placeholder="Please enter your username"
        value={username}
        onChange={changeUsernameHandler}
      />
    </div>
  );
};

export default Username;
