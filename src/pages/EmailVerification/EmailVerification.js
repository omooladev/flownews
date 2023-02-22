import { useParams } from "react-router-dom";
import useFetchContributorData from "../../hooks/useFetchContributorData";
const EmailVerification = () => {
  useFetchContributorData();
  const { _id, token } = useParams();

  return <div></div>;
};

export default EmailVerification;
