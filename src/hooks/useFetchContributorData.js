import { useContext, useEffect } from "react";
import { AppContext } from "../store/App/app-context";
import { AuthContext } from "../store/Auth/auth-context";

const useFetchContributorData = (username) => {
  //----------> check if the contributor is loggedIn
  const {
    appMode: { isLoggedIn },
  } = useContext(AppContext);

  //----------> access the function from the auth context that retrieves
  //            the contributor data from the database
  const { onGetContributorData } = useContext(AuthContext);

  useEffect(() => {
    //----------> so if the contributor is logged in already,
    //            we can fetch from the database their details
    if (isLoggedIn) {
      onGetContributorData(username);
    }
  }, [username, isLoggedIn, onGetContributorData]);
};

export default useFetchContributorData;

//---------->notes about this file
// This file makes sure that the details of logged-in contributors
// are fetched and displayed on their Flownews pages even when they
// refresh the pages.
