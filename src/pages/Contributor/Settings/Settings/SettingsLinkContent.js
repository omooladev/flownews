import { Route, Switch } from "react-router-dom";
import EditProfile from "../EditProfile/EditProfile";
import Appearance from "../Appearance/Appearance";
import Account from "../Account/Account";
import EmailSettings from "../Access/EmailSettings";
import PasswordAuthentication from "../Access/PasswordAuthentication";
import styles from "./SettingsLinkContent.module.css";
import NotFound from "../../../NotFound/NotFound";

const SettingsLinkContent = () => {
  return (
    <section className={styles.setting_link_content}>
      <Switch>
        <Route path="/settings/profile" exact>
          <EditProfile />
        </Route>
        <Route path="/settings/appearance" exact>
          <Appearance />
        </Route>
        <Route path="/settings/account" exact>
          <Account />
        </Route>
        <Route path="/settings/email" exact>
          <EmailSettings />
        </Route>
        <Route path="/settings/security" exact>
          <PasswordAuthentication />
        </Route>
        {/*TODO WORK ON THE NOTIFICATIONS ROUTE  */}
        <Route path="/settings/notifications" exact>
          <div>Work In progress</div>
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </section>
  );
};

export default SettingsLinkContent;
