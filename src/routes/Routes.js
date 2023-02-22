import React, { Suspense, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";
import { Switch, Route, Redirect } from "react-router-dom";
import SuspenseLoader from "../components/Loaders/SuspenseLoader";
import AuthPage from "../pages/Auth/Auth";
import NotFoundPage from "../pages/NotFound";
import ContributorHomePage from "../pages/Contributor/Home";
import EmailVerification from "../pages/EmailVerification/EmailVerification";
//import SettingPage from "../pages/Contributor/Setting/Setting";
const UserHomePage = React.lazy(() => import("../pages/User/Home"));
// const ContributorHomePage = React.lazy(() => import("../pages/Contributor/Home"));
// const AccountPage = React.lazy(() => import("../pages/Contributor/DashBoard/Account"));
const ProfilePage = React.lazy(() => import("../pages/Contributor/Profile/Profile"));
const SettingPage = React.lazy(() => import("../pages/Contributor/Setting/Setting"));
const Routes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Switch>
        {!isLoggedIn && (
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact>
              <UserHomePage />
            </Route>
            <Route path="/login" exact>
              <AuthPage />
            </Route>
            <Route path="/become-contributor" exact>
              <AuthPage />
            </Route>
            <Route path="/forgot-password" exact>
              <AuthPage />
            </Route>
            <Route path="/:_id/verify/:token" exact>
              <EmailVerification />
            </Route>
            {/* <Route path="*">
              <NotFoundPage />
            </Route> */}
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" exact>
              <ContributorHomePage />
            </Route>
            <Route path="/@:username" exact>
              <ProfilePage />
            </Route>
            <Route path="/settings/:path" exact>
              <SettingPage />
            </Route>
            <Route path="/forgot-password" exact>
              <AuthPage />
            </Route>
            <Route path="/:_id/verify/:token" exact>
              <EmailVerification />
            </Route>

            {/* <Route path="*">
              <NotFoundPage />
            </Route> */}
          </Switch>
        )}

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
