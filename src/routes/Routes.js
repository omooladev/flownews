import React, { Suspense, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../pages/Auth/Auth";
const HomePage = React.lazy(() => import("../pages/Home"));

const Routes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {!isLoggedIn && (
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/auth/login" exact>
            <AuthPage />
          </Route>
          <Route path="/auth/become-contributor" exact>
            <AuthPage />
          </Route>
          <Route path="/auth/forgot-password" exact>
            <AuthPage />
          </Route>
        </Switch>
      )}
    </Suspense>
  );
};

export default Routes;
