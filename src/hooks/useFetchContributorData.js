import { useContext, useEffect } from 'react';
import { AppContext } from '../store/App/app-context';
import { AuthContext } from '../store/Auth/auth-context';

//----------> The reason why username is passed into the hook is because of
//            when you want to fetch a contributor data. This is
//            particularly important for searching for a contributor.
const useFetchContributorData = (username) => {
  //----------> check if this contributor is loggedIn
  const {
    appMode: { isLoggedIn },
  } = useContext(AppContext);

  //----------> access the function from the auth context that retrieves
  //            the contributor data from the database
  const { onGetContributorData } = useContext(AuthContext);

  useEffect(() => {
    //----------> If the contributor is logged in,
    //            we fetch the details of the contributor from the database
    if (isLoggedIn) {
      //---------> The username accepted into the hook is passed into the get contributor
      //           function
      onGetContributorData(username);
    }
  }, [username, isLoggedIn, onGetContributorData]);
};

export default useFetchContributorData;

//imp---------->Documentation
// This file makes sure that the details of logged-in contributors
// are fetched from the database
