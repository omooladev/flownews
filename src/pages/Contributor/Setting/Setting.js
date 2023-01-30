import { Route, Switch } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../../../store/App/app-context";
import { AuthContext } from "../../../store/Auth/auth-context";
import SettingCmp from "../../../components/Contributor/Setting/Setting";
import EditProfile from "./EditProfile/EditProfile";
const Setting = () => {
  console.log("olawole");
  const {
    appMode: { isLoggedIn, username },
  } = useContext(AppContext);
  const { onGetContributorData } = useContext(AuthContext);
  useEffect(() => {
    if (isLoggedIn) {
      onGetContributorData(username);
    }
  }, [username, isLoggedIn, onGetContributorData]);
  return (
    <>
      <SettingCmp />
      <Switch>
        <Route to="/profile" exact>
          <EditProfile />
        </Route>
      </Switch>
    </>
  );
};

export default Setting;
