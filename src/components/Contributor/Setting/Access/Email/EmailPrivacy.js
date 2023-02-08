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
  const [error, setError] = useState("");

  const changeEmailPrivacyHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      setError("");
      const checked = event.target.checked;
      const response = await sendRequest(`${HOSTURI}/email/privacy`, {
        method: "PATCH",
        userData: { contributorEmail: email, makeEmailPrivate: checked },
        token,
      });
      const error = (await response.error) || "";
      const data = (await response.data) || "";
      if (data) {
        onSetUserData(data);
      }
      if (error) {
        setError(error);
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
            checked={emailIsPrivate}
            onChange={changeEmailPrivacyHandler}
          />
          <label htmlFor="emailState_checkbox">Keep my email address private</label>
        </div>
        {emailIsPrivate && (
          <p>
            Your email address is set to private therefore it will be only visible on your profile
            page.
          </p>
        )}
        {!emailIsPrivate && (
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
