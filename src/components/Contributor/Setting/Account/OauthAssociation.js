import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import OauthPermission from "./OauthPermission";
import styles from "./OauthAssociation.module.css";
const OauthAssociation = () => {
  const {
    contributorData: {
      socialMediaHandles: { facebook, twitter },
    },
  } = useContext(AuthContext);
  const oauthButtons = [
    { name: facebook && "Remove Facebook", icon: <FaFacebook className={styles.icon} /> },
    { name: twitter && "Remove Twitter", icon: <FaTwitter className={styles.icon} /> },
  ];

  return (
    <>
      {(facebook || twitter) && (
        <div className={styles.oauth_association}>
          <h3>Remove OAuth Associations</h3>
          <ul>
            <li>
              You can remove one of your authentication methods. We'll still need one to authenticate you.
            </li>
            <li>Removing an OAuth association will:</li>
            <li className={styles.example}>Remove your ability to sign in with that account</li>
            <li className={styles.example}>Remove the associated URL from your profile</li>
            <li>
              Note that this does not revoke our OAuth app access; you will have to do so in your settings for
              the specific provider:
            </li>
          </ul>

          <OauthPermission />
          <div className={styles.remove_oauth}>
            {oauthButtons.map((button) => {
              if (!button.name) {
                return null;
              }
              return (
                <button key={button.name}>
                  {button.icon}
                  <label> {button.name}</label>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default OauthAssociation;
