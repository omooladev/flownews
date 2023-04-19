import { Fragment, useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import useFetchContributorData from "../../../../hooks/useFetchContributorData";
import useNewLocation from "../../../../hooks/useNewLocation";
import SettingLinks from "./SettingLinks";
import SettingsLinkContent from "./SettingsLinkContent";
import styles from "./Settings.module.css"
const Settings = () => {
  useFetchContributorData();
  const { contributorData, history } = useContext(AuthContext);
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
