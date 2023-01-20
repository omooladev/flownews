import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/auth-context";
const Account = () => {
  const { token, onGetContributorData } = useContext(AuthContext);
  const { email } = useParams();
  useEffect(() => {
    if (email) {
      onGetContributorData(email);
    }
  }, [email, token, onGetContributorData]);
  return;
};

export default Account;
