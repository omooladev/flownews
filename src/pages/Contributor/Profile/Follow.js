import { useLocation } from "react-router-dom";
import { useTitle } from "../../../hooks/useTitle";
const Follow = () => {
  //----------> Get the pathname from the uri and split it
  const pathname = useLocation().pathname.split("/");

  //----------> get the username from the pathname
  const username = pathname[1];
  //----------> get the follow value from the pathname.
  //            It is either followers or following
  const followValue = pathname[2];

  //----------> change title of the website
  useTitle(
    `${followValue === "following" ? "following" : followValue === "followers" ? "followers" : ""}`
  );
  return;
};

export default Follow;
