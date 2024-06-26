import React, { Suspense, useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";
import { Switch, Route, Redirect } from "react-router-dom";
import SuspenseLoader from "../components/Loaders/SuspenseLoader";
import AuthPage from "../pages/Auth/Auth";
import NotFoundPage from "../pages/NotFound/NotFound";
import UserHomePage from "../pages/User/Home";
import ContributorHomePage from "../pages/Contributor/Home";
import ProfilePage from "../pages/Contributor/Profile/Profile";
//---import FollowPage from "../pages/Contributor/Profile/Follow";
import EmailVerification from "../pages/EmailVerification/EmailVerification";
import SettingPage from "../pages/Contributor/Settings/Settings/Settings";
import NewStoryPage from "../pages/Contributor/NewStory";
import GuideToPostingPage from "../pages/Contributor/GuideToPosting";
import DraftPreview from "../pages/Contributor/Story/DraftPreview";

const Routes = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Switch>
        <Route path="/:_id/reset_password/:token" exact>
          <AuthPage />
        </Route>
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
            {/* Route for writing new story */}
            <Route path="/new-story" exact>
              <NewStoryPage />
            </Route>
            <Route path="/story/:storyId/edit" exact>
              <NewStoryPage />
            </Route>
            <Route path="/guide-to-posting">
              <GuideToPostingPage />
            </Route>
            <Route path="/@:username/story/draft/preview/:draftId" exact>
              <DraftPreview />
            </Route>

            <Route path="/@:username" exact>
              <ProfilePage />
            </Route>
            {/* <Route path={["/@:username/followers", "/@:username/following"]} exact>
              <FollowPage />
            </Route> */}
            <Route path="/settings">
              <SettingPage />
            </Route>
            <Route path="/forgot-password" exact>
              <AuthPage />
            </Route>
            <Route path="/:_id/verify/:token" exact>
              <EmailVerification />
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
