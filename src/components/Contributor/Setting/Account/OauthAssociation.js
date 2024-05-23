//<---------- IMPORT MODULES ---------->
import { useCallback, useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { FaTwitter, FaFacebook } from "react-icons/fa";
import OauthPermission from "./OauthPermission";
import styles from "./DeleteAccount.module.css";
import useHttp from "../../../../hooks/useHttp";
const OauthAssociation = () => {
  let { sendRequest } = useHttp();
  let {
    token,
    HOSTURI,
    onSaveContributorData,
    contributorData: {
      socialMediaHandles: { facebook, twitter },
    },
  } = useContext(AuthContext);
  const oauthButtons = [
    { key: "facebook", name: facebook && "Remove Facebook", icon: <FaFacebook className={styles.icon} /> },
    { key: "twitter", name: twitter && "Remove Twitter", icon: <FaTwitter className={styles.icon} /> },
  ];

  const unlinkSocialMediaAccount = useCallback(
    async (key) => {
      //----------> where key is the name of the social media
      const { data } = await sendRequest(`${HOSTURI}/contributor/unlink/${key}`, {
        method: "POST",
        token,
      });

      if (data) {
        onSaveContributorData(data);
      }
    },
    [token, sendRequest, HOSTURI, onSaveContributorData]
  );

  return (
    <>
      {(facebook || twitter) && (
        <div className={styles.oauth_association}>
          <h3>Remove OAuth Associations</h3>
          <ul>
            <li>
              You can remove one of your authentication methods. We'll still need one to authenticate you.
            </li>
            <li>Removing an OAuth association will :</li>
            <li className={styles.secondary_list}>Remove your ability to sign in with that account</li>
            <li className={styles.secondary_list}>Remove the associated URL from your profile</li>
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
                <button key={button.name} onClick={() => unlinkSocialMediaAccount(button.key)}>
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
