import { useContext } from "react";
import NotFound from "../pages/NotFound/NotFound";
import { AuthContext } from "../store/Auth/auth-context";

const Error = () => {
  const { contributorError, pageIsLoading } = useContext(AuthContext);

  return (
    <>
      {!pageIsLoading && contributorError.hasError && contributorError.ref !== "network_error" && (
        <NotFound />
      )}
      {!pageIsLoading && contributorError.hasError && contributorError.ref === "network_error" && (
        <p style={{ color: `var(--secondary-color)` }}>Network Error, please refresh page</p>
      )}
    </>
  );
};

export default Error;
