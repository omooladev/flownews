//<---------- IMPORT MODULES ---------->
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import styles from "./DeleteAccount.module.css";
const OauthPermission = () => {
  let {
    contributorData: {
      socialMediaHandles: { facebook, twitter },
    },
  } = useContext(AuthContext);
  facebook = "https://wwww.wole.com";
  twitter = "https://wwww.wole.com";
  const oauthProfileLink = [
    { text: facebook && "Facebook profile settings", to: "eeee" },
    {
      text: twitter && "Twitter profile settings",
      to: "https://twitter.com/settings/applications",
    },
  ];
  return (
    <>
      {(facebook || twitter) && (
        <ul className={styles.oauth_permission}>
          {oauthProfileLink.map((link) => {
            if (!link.text || !link.to) {
              return null;
            }
            return (
              <li key={link.text} className={styles.secondary_list}>
                <Link to={link.to}>{link.text}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default OauthPermission;
