import { useCallback, useContext } from "react";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import { AuthContext } from "../../../../../store/Auth/auth-context";
import Card from "../../../../../UI/Card";
import styles from "./ConnectAccount.module.css";

const ConnectAccount = () => {
  const {
    HOSTURI,
    token,
    history,
    changeAppMode,
    contributorData: {
      socialMediaHandles: { facebook, twitter },
    },
  } = useContext(AuthContext);

  const connectFacebook = useCallback(
    async (event) => {
      if (history.location.search) {
        //----------> if there is a search parameter in the uri like facebook connected, remove it before changing the app mode
        history.location.search = "";
      }

      changeAppMode({ isConnectingSocial: true });
      window.location = `${HOSTURI}/contributor/connect/facebook?token=${token}&currentPageUrl=${history.location.pathname}`;
    },
    [HOSTURI, token, history, changeAppMode]
  );
  return (
    <>
      {(!facebook || !twitter) && (
        <Card className={styles.connect_account}>
          {!facebook && (
            <button className={styles.facebook} onClick={connectFacebook}>
              <FaFacebook className={styles.icon} />
              <label>Connect Facebook</label>
            </button>
          )}
          {!twitter && (
            <button className={styles.twitter}>
              <FaTwitter className={styles.icon} />
              <label>Connect Twitter</label>
            </button>
          )}
        </Card>
      )}
    </>
  );
};

export default ConnectAccount;
