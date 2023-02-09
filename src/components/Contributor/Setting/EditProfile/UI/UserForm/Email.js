import { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../../../store/Auth/auth-context";
import styles from "./UserForm.module.css";
const Email = (props) => {
  const {
    userData: { email: emailAddress, emailIsPrivate },} = useContext(AuthContext);
  let { onGetEmail } = props;
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const changeEmailHandler = useCallback((event) => {
    const emailIsValid = event.target.value.includes("@");
    setEmail((prevValue) => {
      return event.target.value;
    });
    if (!emailIsValid) {
      return setEmailError("Please provide a valid email address");
    }
    setEmailError("");
  }, []);

  useEffect(() => {
    if (emailAddress) {
      setEmail((prevValue) => emailAddress);
    }
  }, [emailAddress]);
  useEffect(() => {
    if (email) {
      onGetEmail(email);
    }
  }, [email, onGetEmail]);
  return (
    <div className={styles.form_control}>
      <label>Public Email</label>
      {emailError && <p className="error">{emailError}</p>}
      <input
        type="email"
        placeholder="Please enter your email address"
        value={email}
        onChange={changeEmailHandler}
        required={true}
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
