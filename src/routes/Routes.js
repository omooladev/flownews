import React, { Suspense, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../pages/Auth/Auth";
import NotFoundPage from "../pages/NotFound";
import { AppContext } from "../store/App/app-context";

const HomePage = React.lazy(() => import("../pages/Home"));
const AccountPage = React.lazy(() => import("../pages/Contributor/DashBoard/Account"));

const Routes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { appMode } = useContext(AppContext);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Switch>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
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
            {appMode.username && (
              <Route path="/" exact>
                <Redirect to={`/@${appMode.username}`} />
              </Route>
            )}
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
