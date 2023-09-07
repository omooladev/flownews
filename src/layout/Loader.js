import { useContext } from "react";
import { AuthContext } from "../store/Auth/auth-context";
import SuspenseLoader from "../components/Loaders/SuspenseLoader";

const Loader = () => {
  const { pageIsLoading } = useContext(AuthContext);

  return <>{pageIsLoading && <SuspenseLoader />}</>;
};

export default Loader;
