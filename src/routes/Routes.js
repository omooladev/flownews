import React, { Suspense, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../pages/Auth/Auth";
import NotFoundPage from "../pages/NotFound";

const HomePage = React.lazy(() => import("../pages/Home"));
const AccountPage = React.lazy(() => import("../pages/Contributor/DashBoard/Account"));

const Routes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Switch>
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
            <Route path="/@:username" exact>
              <AccountPage />
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
