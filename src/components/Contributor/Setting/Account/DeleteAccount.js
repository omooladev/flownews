import { Link } from "react-router-dom";
import OauthAssociation from "./OauthAssociation";
import styles from "./DeleteAccount.module.css";
const DeleteAccount = () => {
  return (
    <section>
      <h2>Delete Account</h2>
      <hr />
      <OauthAssociation />
      <h3>Delete Your account</h3>
      <ul>
        <li>Once you delete your account,there is no going back</li>
        <li>Deleting your account will:</li>
        <li>
          Delete your profile, along with your authentication associations. This does not include
          applications permissions. You will have to remove them yourself:
          <ul>
            <li>
              <Link to="https://github.com/settings/applications">GitHub profile settings</Link>
            </li>
            <li>
              <Link to="https://twitter.com/settings/applications">Twitter profile settings</Link>
            </li>
          </ul>
        </li>
      </ul>

      <p>
        Delete any and all content you have, such as articles, comments, or your reading list. Allow
        your username to become available to anyone.
      </p>
      <button type="button">Delete your account</button>
    </section>
  );
};

export default DeleteAccount;
