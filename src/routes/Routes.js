import React, { Suspense, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../pages/Auth/Auth";
import NotFoundPage from "../pages/NotFound";

const HomePage = React.lazy(() => import("../pages/Home"));

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
            <Route path="/auth/login" exact>
              <AuthPage />
            </Route>
            <Route path="/auth/become-contributor" exact>
              <AuthPage />
            </Route>
            <Route path="/auth/forgot-password" exact>
              <AuthPage />
            </Route>
            <Route path="/account" exact>
              <Redirect to="/auth/login" />
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
