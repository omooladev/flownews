import { Fragment, useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import useFetchContributorData from "../../../../hooks/useFetchContributorData";
import useNewLocation from "../../../../hooks/useNewLocation";
import SettingLinks from "./SettingLinks";
import SettingsLinkContent from "./SettingsLinkContent";
import styles from "./Settings.module.css";
const Settings = () => {
  //----------> fetch contributor data first because when you refresh the page
  //            we need all your details back
  useFetchContributorData();
  //----------> get contributor data and the object in the history method
  const { contributorData, history } = useContext(AuthContext);
  //----------> update location
  useNewLocation(history.location.pathname);
  return (
    <Fragment>
      {contributorData.username && (
        <section className={styles.settings}>
          {/* <ProfileUpdated /> */}
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
