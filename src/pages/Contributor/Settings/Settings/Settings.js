import { Fragment, useContext, useEffect } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import useFetchContributorData from "../../../../hooks/useFetchContributorData";
import useNewLocation from "../../../../hooks/useNewLocation";
import SettingLinks from "./SettingLinks";
import SettingsLinkContent from "./SettingsLinkContent";
import styles from "./Settings.module.css";
import ProfileUpdated from "../../../../components/Contributor/Setting/EditProfile/UI/ProfileUpdated";
const Settings = () => {
  //----------> fetch contributor data first because when you refresh the page
  //            we need all your details back
  useFetchContributorData();
  //----------> get contributor data and the object in the history method
  const { contributorData, history, onChangeProfileUpdated, changeAppMode, appMode } =
    useContext(AuthContext);
  //----------> update location
  useNewLocation(history.location.pathname);

  useEffect(() => {
    if (history.location.search === "?facebook=connected") {
      if (appMode.isConnectingSocial) {
        onChangeProfileUpdated(true, "You've successfully connected your Facebook account!");
        changeAppMode({ isConnectingSocial: false });
      }
    }
  }, [history, onChangeProfileUpdated, changeAppMode, appMode]);
  return (
    <Fragment>
      {contributorData.username && (
        <section className={styles.settings}>
          <ProfileUpdated />
          <SettingLinks />
          <SettingsLinkContent />
        </section>
      )}
    </Fragment>
  );
};

export default Settings;

//imp<---------- Documentation ---------->
// If username can be found in the contributor data, this means that the settings
//  page will be displayed, else a 404:Page not found would be thrown
