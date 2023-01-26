import React, { Suspense, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../pages/Auth/Auth";
import NotFoundPage from "../pages/NotFound";
import SuspenseLoader from "../components/Loaders/SuspenseLoader";

const UserHomePage = React.lazy(() => import("../pages/User/Home"));
const ContributorHomePage = React.lazy(() => import("../pages/Contributor/Home"));
// const AccountPage = React.lazy(() => import("../pages/Contributor/DashBoard/Account"));
const ProfilePage = React.lazy(() => import("../pages/Contributor/Profile/Profile"));

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
            <Route path="/account" exact>
              <Redirect to="/login" />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
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
            <Route path="/:username" exact>
              <ProfilePage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
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
