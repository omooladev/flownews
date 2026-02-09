//<---------- IMPORT MODULES ---------->
import { useCallback, useContext, useState } from "react";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import styles from "./EmailPrivacy.module.css";

const EmailPrivacy = () => {
  const {
    onSaveContributorData,
    contributorData: { emailIsPrivate },
    onToggleEmailPrivacy,
  } = useContext(AuthContext);
  const [emailPrivacy, setEmailPrivacy] = useState(emailIsPrivate);
  const [error, setError] = useState("");

  //<--------- FUNCTIONS ---------->
  const ToggleEmailPrivacyHandler = useCallback(
    async (event) => {
      event.stopPropagation();
      setError("");
      const checked = event.target.checked;
      setEmailPrivacy((prevState) => {
        return checked;
      });
      const { data, error } = await onToggleEmailPrivacy();

      if (data) {
        onSaveContributorData(data);
      }
      if (error) {
        setError(error);
        setEmailPrivacy((prevState) => {
          return !prevState;
        });
      }
    },
    [onToggleEmailPrivacy, onSaveContributorData]
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
            onChange={ToggleEmailPrivacyHandler}
          />
          <label htmlFor="emailState_checkbox">Keep my email address private</label>
        </div>
        {emailPrivacy && (
          <p className={styles.text}>
            Your email address is set to private therefore it will be visible only on your profile page.
          </p>
        )}
        {!emailPrivacy && (
          <p className={styles.text}>
            Your email address is set to public therefore it will appear everywhere on flownews when you
            comment or post a content
          </p>
        )}
      </div>
      <hr />
    </>
  );
};

export default EmailPrivacy;
