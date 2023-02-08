import { useCallback, useContext, useState } from "react";
import useHttp from "../../../../../hooks/useHttp";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import styles from "./EmailPrivacy.module.css";

const EmailState = () => {
  const { sendRequest } = useHttp();
  const {
    HOSTURI,
    token,
    onSetUserData,
    userData: { email, emailIsPrivate },
  } = useContext(AuthContext);
  const [emailPrivacy, setEmailPrivacy] = useState(emailIsPrivate);
  const [error, setError] = useState("");

  const changeEmailPrivacyHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      setError("");
      const checked = event.target.checked;
      setEmailPrivacy((prevState) => {
        return checked;
      });
      const response = await sendRequest(`${HOSTURI}/email/privacy`, {
        method: "PATCH",
        userData: { contributorEmail: email, makeEmailPrivate: checked },
        token,
      });
      const error =response.error || "";
      const data = response.data || "";
      if (data) {
        onSetUserData(data);
      }
      if (error) {
        setError(error);
        setEmailPrivacy((prevState) => {
          return !prevState;
        });
      }
    },
    [token, sendRequest, HOSTURI, onSetUserData, email]
  );
  return (
    <>
      <div className={styles.emailState}>
        {error && <p className="error">{error}</p>}
        <div className={styles.checkbox_label}>
          <input
            type="checkbox"
            id="emailState_checkbox"
            checked={emailPrivacy}
            onChange={changeEmailPrivacyHandler}
          />
          <label htmlFor="emailState_checkbox">Keep my email address private</label>
        </div>
        {emailPrivacy && (
          <p>
            Your email address is set to private therefore it will be visible only on your profile
            page.
          </p>
        )}
        {!emailPrivacy && (
          <p>
            Your email address is set to public therefore it will appear everywhere on flownews when
            you comment or post a content
          </p>
        )}
      </div>
      <hr />
    </>
  );
};

export default EmailState;
