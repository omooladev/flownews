import React, { Suspense, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "../store/Auth/auth-context";
const HomePage = React.lazy(() => import("../pages/Home"));

const Routes = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {!isLoggedIn && (
        <Switch>
          <Route path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
        </Switch>
      )}
    </Suspense>
  );
};

export default Routes;
