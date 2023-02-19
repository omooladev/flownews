import { useContext } from "react";
import { AuthContext } from "../../../../store/Auth/auth-context";
import { FaTwitter, FaFacebook, FaMedium } from "react-icons/fa";
import OauthPermission from "./OauthPermission";
const OauthAssociation = () => {
  const {
    userData: {
      socialMediaHandles: { facebook, twitter, medium },
    },
  } = useContext(AuthContext);

  return (
    <>
      {(facebook || twitter || medium) && (
        <div>
          <h3>Remove OAuth Associations</h3>
          <ul>
            <li>
              You can remove one of your authentication methods. We'll still need one to
              authenticate you.
            </li>
            <li>Removing an OAuth association will:</li>
            <li>remove your ability to sign in with that account</li>
            <li>remove the associated URL from your profile</li>
            <li>
              Note that this does not revoke our OAuth app access; you will have to do so in your
              settings for the specific provider:
            </li>
          </ul>

          <OauthPermission />
          <div>
            {facebook && (
              <button>
                <FaFacebook />
                Remove facebook
              </button>
            )}
            {twitter && (
              <button>
                <FaTwitter />
                Remove twitter
              </button>
            )}
            {medium && (
              <button>
                <FaMedium />
                Remove medium
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OauthAssociation;
