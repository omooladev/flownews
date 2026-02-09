//<---------- IMPORT MODULES ---------->
import { useCallback, useState } from "react";
import OauthAssociation from "./OauthAssociation";
import OauthPermission from "./OauthPermission";
import ConfirmAccountDeletionPopUp from "./ConfirmAccountDeletionPopUp";
import styles from "./DeleteAccount.module.css";
const DeleteAccount = () => {
  //----------> state for toggling the popup
  const [showPopUp, setShowPopUp] = useState(false);
  const deleteAccountHandler = useCallback(() => {
    setShowPopUp(true);
  }, []);
  return (
    <section className={styles.delete_account}>
      {showPopUp && (
        <ConfirmAccountDeletionPopUp
          onSetShowPopUp={() => {
            setShowPopUp(false);
          }}
        />
      )}
      <h2>Delete Account</h2>
      <hr />
      {/* FOR DISPLAYING THE CONNECTED SOCIAL MEDIA APPLICATION */}
      <OauthAssociation />
      <h3>Delete Your account</h3>
      <ul>
        <li>Once you delete your account, there is no going back</li>
        <li>Deleting your account will:</li>
        <li className={styles.secondary_list}>
          Delete your profile, along with your authentication associations. This does not include applications
          permissions. You will have to remove them yourself:
          <OauthPermission />
        </li>
        <li className={styles.secondary_list}>
          Delete any and all content you have, such as articles, comments, or your reading list. Allow
          your username to become available to anyone.
        </li>
      </ul>
      <button type="button" className={styles.delete_button} onClick={deleteAccountHandler}>
        Delete your account
      </button>
    </section>
  );
};

export default DeleteAccount;
