//<---------- IMPORT MODULES ---------->
import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import styles from "./DeleteAccount.module.css";
const OauthPermission = () => {
  let {
    contributorData: {
      socialMediaHandles: { facebook, twitter },
    },
  } = useContext(AuthContext);
  const oauthProfileLink = [
    {
      text: facebook && "Facebook profile settings",
      href: "https://facebook.com/settings/?tab=applications",
    },
    {
      text: twitter && "Twitter profile settings",
      href: "https://twitter.com/settings/applications",
    },
  ];
  return (
    <>
      {(facebook || twitter) && (
        <ul className={styles.oauth_permission}>
          {oauthProfileLink.map((link) => {
            if (!link.text || !link.href) {
              return null;
            }
            return (
              <li key={link.text} className={styles.secondary_list}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default OauthPermission;
