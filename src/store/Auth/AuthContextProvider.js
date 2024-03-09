import { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./auth-context";
import { AppContext } from "../App/app-context";
import useHttp from "../../hooks/useHttp";
//const HOSTURI = "http://localhost:5000/api/v1";
//const HOSTURI = "https://flownews-api.onrender.com/api/v1";
//----------> deployment link of the dev branch---> which is the preview deployment
//let HOSTURI = "https://flownews-api-git-dev-omosuyi-olawoles-projects.vercel.app/api/v1";
//let HOSTURI = "https://flownews-abnbak5iu-omosuyi-olawoles-projects.vercel.app/api/v1";
let HOSTURI = "https://flownews-api.vercel.app/api/v1"; //----------> master branch deployment link
const AuthContextProvider = (props) => {
  //----------> get the http request functions from the useHttp hook
  const { sendRequest, cancelRequest } = useHttp();

  const {
    appMode: { isLoggedIn, token },
    onChangeAppMode,
    onToggleComponentsIsActive,
    lastLocation,
  } = useContext(AppContext);

  //<----------- States ---------->
  const [makeBodyFixed, setMakeBodyFixed] = useState(false); //----------> Used to make body fixed when a pop up is shown

  const [pageIsLoading, setPageIsLoading] = useState(null);

  const [contributorError, setContributorError] = useState({
    hasError: false,
    message: "",
    ref: null,
  });
  const history = useHistory();

  //?refactored

  const [contributorData, setContributorData] = useState({ username: "" });
  const [searchedContributorData, setSearchedContributorData] = useState({
    username: "",
  });
  const [profileUpdated, setProfileUpdated] = useState(false);
  const loginOrBecomeContributor = useCallback(
    async ({ location, contributorAuthData }) => {
      const response = await sendRequest(`${HOSTURI}/auth/${location}`, {
        method: "POST",
        contributorData: contributorAuthData,
      });
      return response;
    },
    [sendRequest]
  );

  //----------> Fetch the contributor data
  const getContributorData = useCallback(
    async (username) => {
      //----------> if username is found in the contributor data and
      //            no username is sent from the fetch contributor data hook
      //            or the username passed in the hook is the same as the one found
      //            in the contributor data or if the username found in the search
      //            contributor is the same as the one passed in the hook,
      //            then this means that we still have access to the Contributor details
      //            so do not fetch it again.
      //-----------> More Explanation is found at the bottom of the file

      if (
        contributorData.username &&
        (!username || contributorData.username === username || searchedContributorData.username === username)
      ) {
        //* This means that if contributor data exits already, then there is no need to fetch data again
        return;
      }

      setPageIsLoading((prevState) => {
        return true;
      });

      const response = await sendRequest(`${HOSTURI}/contributors${username ? "/" + username : ""}`, {
        method: "GET",
        token,
      });
      const data = response.data;
      const error = response.error;

      if (data) {
        const isSearch = data.isSearch;

        setContributorData((prevData) => {
          return { ...prevData, ...data.contributor };
        });

        if (isSearch) {
          //----------> if we are searching for a contributor, then the data gotten is for the
          //            searched contributor

          setSearchedContributorData((prevData) => {
            return { ...prevData, ...data.searchedContributor };
          });
        }
      }
      if (error) {
        if (error === "Cannot find contributor") {
          //----------> if the contributor you're searching for does not exist,
          //            we display the 404 page
          setContributorError((prevError) => {
            return { ...prevError, hasError: true, message: error };
          });
        } else if (error === "Authentication Failed" || error === "Cannot find your account") {
          onChangeAppMode({ token: null, isLoggedIn: false });
        } else {
          setContributorError((prevError) => {
            return {
              ...prevError,
              hasError: true,
              message: error,
              ref: "network_error",
            };
          });
        }
      }

      return setPageIsLoading((prevState) => {
        return false;
      });
    },
    [sendRequest, token, contributorData.username, searchedContributorData, onChangeAppMode]
  );
  //----------> reset the searched contributor to not contain any data
  const resetSearchedContributor = useCallback(() => {
    return setSearchedContributorData((prevData) => {
      return { username: "" };
    });
  }, []);

  //----------> a function that lets you follow or un follow a contributor
  const toggleFollowContributor = useCallback(
    async ({ action }) => {
      const response = await sendRequest(
        `${HOSTURI}/contributor/follow?action=${action}&username=${searchedContributorData.username}`,
        {
          method: "POST",
          token,
        }
      );
      const data = response.data;
      const error = response.error;
      if (data) {
        //----------> update the contributor data state
        setContributorData((prevData) => {
          return { ...prevData, ...data.contributor };
        });
        //----------> update the searched contributor data state
        setSearchedContributorData((prevData) => {
          return { ...prevData, ...data.searchedContributor };
        });
        // //----------> if we have successfully unfollowed the contributor then can can reset the
        // if (action === "unfollow") {
        //   return "success";
        // }
      }
      if (error) {
        console.log(error);
        return;
      }
    },
    [searchedContributorData, sendRequest, token]
  );
  const resetContributorError = useCallback(() => {
    setContributorError((prevError) => {
      return { ...prevError, hasError: false, message: "" };
    });
  }, []);

  const signOutHandler = useCallback(() => {
    onChangeAppMode({
      isLoggedIn: false,
      token: null,
      username: null,
      tokenExpirationTime: null,
    });
    onToggleComponentsIsActive({ event: "*" });
    setProfileUpdated(false);
    setContributorData((prevData) => {
      return { username: "" };
    });
    history.replace("/home");
  }, [history, onToggleComponentsIsActive, onChangeAppMode]);

  const update_ResetPasswordHandler = useCallback(
    async (title, passwordProperties) => {
      const response = await sendRequest(`${HOSTURI}/password/${title}`, {
        method: "PATCH",
        userData: { passwordProperties },
        token,
      });
      return response;
    },
    [sendRequest, token]
  );

  const verifyEmailHandler = useCallback(
    async (uri) => {
      const response = await sendRequest(`${HOSTURI}/auth${uri}`, {
        method: "PATCH",
      });
      return response;
    },
    [sendRequest]
  );

  const resetPasswordHandler = useCallback(
    async (username, passwordProperties) => {
      const response = await sendRequest(`${HOSTURI}/auth/${username}/reset_password`, {
        method: "PATCH",
        contributorData: passwordProperties,
      });
      return response;
    },
    [sendRequest]
  );

  const sendPasswordResetEmail = useCallback(
    async (email, title) => {
      const response = await sendRequest(`${HOSTURI}/auth/password/${title}`, {
        method: "POST",
        contributorData: { email },
      });
      return response;
    },
    [sendRequest]
  );
  const verifyPasswordResetLink = useCallback(
    async (uri) => {
      const response = await sendRequest(`${HOSTURI}/auth${uri}`, {
        method: "POST",
      });
      return response;
    },
    [sendRequest]
  );
  //?refactored functions
  const saveContributorData = useCallback((data) => {
    setContributorData((prevData) => {
      return { ...prevData, ...data };
    });
  }, []);
  const updateContributorProfile = useCallback(
    async (updateProperties) => {
      const response = await sendRequest(`${HOSTURI}/contributor/update-profile`, {
        method: "PATCH",
        contributorData: { updateProperties },
        token,
      });
      return response;
    },
    [sendRequest, token]
  );
  const changeProfileUpdated = useCallback((bool) => {
    return setProfileUpdated(bool);
  }, []);
  const toggleEmailPrivacy = useCallback(async () => {
    const response = await sendRequest(`${HOSTURI}/email/privacy`, {
      method: "PATCH",
      token,
    });
    return response;
  }, [sendRequest, token]);
  useEffect(() => {
    if (makeBodyFixed) {
      return document.body.classList.add("fixed-body");
    }
    return document.body.classList.remove("fixed-body");
  }, [makeBodyFixed]);
  return (
    <AuthContext.Provider
      value={{
        HOSTURI,
        token,
        history,
        searchedContributorData,
        onResetSearchedContributor: resetSearchedContributor,
        pageIsLoading,
        isLoggedIn,
        contributorError,
        onResetContributorError: resetContributorError,
        onGetContributorData: getContributorData,
        onToggleFollowContributor: toggleFollowContributor,
        onLoginOrBecomeContributor: loginOrBecomeContributor,
        onSignOut: signOutHandler,

        onUpdate_ResetPassword: update_ResetPasswordHandler,

        onVerifyEmailAddress: verifyEmailHandler,
        onResetPassword: resetPasswordHandler,

        onVerifyPasswordResetLink: verifyPasswordResetLink,

        //?Refactored already
        lastLocation,
        contributorData,
        onSaveContributorData: saveContributorData,
        profileUpdated,
        onChangeProfileUpdated: changeProfileUpdated,
        changeAppMode: onChangeAppMode,
        //<----------- Variable and function responsible for making body fixed-------->
        makeBodyFixed,
        onMakeBodyFixed: (bool) => setMakeBodyFixed(bool),
        onUpdateContributorProfile: updateContributorProfile,
        onToggleEmailPrivacy: toggleEmailPrivacy,
        onSendPasswordResetEmail: sendPasswordResetEmail,

        cancelRequest,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

//imp---------------------> Documentation
//imp Case 1:    getContributorData
// When I as a contributor is logged Into my account and I refresh the profile page,
// a request is sent to fetch my details again because on refresh most of my details is already lost.
// Now If i try to access any other page, we need to be sure that my details is still retained on the request,
// we run the getContributorData function again and this time, we check if my username already exist on the request data
// If it is not found, we fetch the details from the database but If it is found, we navigate to the new page.
//imp Case 2:    getContributorData
// In this case, when we want to search for another contributor, we check if the username of the contributor you
// are searching for is not the same as yours. If it is the same, we do not proceed with your request, however if it
// is not the same, then we fetch the contributor and save his details to the search Contributor data.
