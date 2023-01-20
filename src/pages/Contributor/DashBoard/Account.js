import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../store/Auth/auth-context";
const Account = () => {
  const { token } = useContext(AuthContext);
  const { email } = useParams();
  useEffect(() => {
    console.log(token, email);
  }, [email, token]);
  return;
};

export default Account;
