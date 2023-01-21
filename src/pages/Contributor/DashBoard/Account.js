import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/auth-context";
const Account = () => {
  const { token, onGetContributorData } = useContext(AuthContext);
  const { username } = useParams();
  useEffect(() => {
    if (username) {
      onGetContributorData(username);
    }
  }, [username, token, onGetContributorData]);
  return;
};

export default Account;
