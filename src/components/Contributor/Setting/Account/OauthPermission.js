import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import styles from "./OauthPermission.module.css";
const OauthPermission = () => {
  const {
    userData: {
      socialMediaHandles: { facebook, twitter },
    },
  } = useContext(AuthContext);
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
              <li key={link.text}>
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
