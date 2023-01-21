import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../../store/App/app-context";
import { AuthContext } from "../../../store/Auth/auth-context";
const Account = () => {
  const { onSetLastLocation } = useContext(AppContext);
  const { token, onGetContributorData } = useContext(AuthContext);
  const { username } = useParams();
  useEffect(() => {
    onSetLastLocation(`/@${username}`);
    if (username) {
      onGetContributorData(username);
    }
  }, [username, token, onGetContributorData]);
  return;
};

export default Account;
