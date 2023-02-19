import OauthAssociation from "./OauthAssociation";
import styles from "./DeleteAccount.module.css";
import OauthPermission from "./OauthPermission";
const DeleteAccount = () => {
  return (
    <section className={styles.delete_account}>
      <h2>Delete Account</h2>
      <hr />
      <OauthAssociation />
      <h3>Delete Your account</h3>
      <ul className={styles.delete_account_list}>
        <li>Once you delete your account,there is no going back</li>
        <li>Deleting your account will:</li>
        <li className={styles.example}>
          Delete your profile, along with your authentication associations. This does not include
          applications permissions. You will have to remove them yourself:
          <OauthPermission />
        </li>
        <li className={styles.example}>
          Delete any and all content you have, such as articles, comments, or your reading lis Allow
          Allow your username to become available to anyone.
        </li>
      </ul>
      <button type="button" className={styles.delete_account_button}>
        Delete your account
      </button>
    </section>
  );
};

export default DeleteAccount;
