// import { useLocation } from "react-router-dom";
// import { useTitle } from "../../../hooks/useTitle";
// //----------> import the profile component
// import { useContext } from "react";
// import FollowCmp from "../../../components/Contributor/Profile/Follow/Follow";
// import useFetchContributorData from "../../../hooks/useFetchContributorData";
// import { AuthContext } from "../../../store/Auth/auth-context";
// const Follow = () => {
//   //----------> Get the pathname from the uri and split it
//   const pathname = useLocation().pathname.split("/");

//   //----------> get the username from the pathname
//   const username = pathname[1].split("@")[1];
//   //----------> get the follow value from the pathname.
//   //            It is either followers or following
//   const followPath = pathname[2];
//   //---------->fetches contributor data

//   //----------> fetch the data of the contributor
//   useFetchContributorData(username);

//   const { contributorData } = useContext(AuthContext);

//   //----------> change title of the website
//   useTitle(
//     `${
//       followPath === "following"
//         ? `People followed by ${username}`
//         : followPath === "followers"
//         ? `People following ${username}`
//         : ""
//     }`
//   );
//   return (
//     <>{contributorData.username && <FollowCmp followPath={followPath} username={username} />}</>
//   );
// };

// export default Follow;
