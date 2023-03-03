import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserForm.module.css";
const Email = (props) => {
  let { email, emailIsPrivate, onGetValue } = props;
  const [newEmail, setNewEmail] = useState(email);
  const [newEmailError, setNewEmailError] = useState("");

  const changeEmailHandler = useCallback(
    (event) => {
      const emailIsValid = event.target.value.includes("@");
      if (!emailIsValid) {
        return setNewEmailError("Please provide a valid email address");
      }
      setNewEmailError("");
      setNewEmail((prevValue) => {
        return event.target.value;
      });
      onGetValue({ type: "email", value: event.target.value });
    },
    [onGetValue]
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
