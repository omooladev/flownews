import { Link } from "react-router-dom";
import { FaTwitter, FaGithub } from "react-icons/fa";
const OauthAssociation = () => {
  return (
    <div>
      <h3>Remove OAuth Associations</h3>
      <ul>
        <li>
          You can remove one of your authentication methods. We'll still need one to authenticate
          you.
        </li>
        <li>Removing an OAuth association will:</li>
        <li>remove your ability to sign in with that account</li>
        <li>remove the associated URL from your profile</li>
        <li>
          Note that this does not revoke our OAuth app access; you will have to do so in your
          settings for the specific provider:
        </li>
      </ul>

      <ul>
        <li>
          <Link to="https://github.com/settings/applications">GitHub profile settings</Link>
        </li>
        <li>
          <Link to="https://twitter.com/settings/applications">Twitter profile settings</Link>
        </li>
      </ul>
      <div>
        <button>
          <FaGithub />
          Remove Github
        </button>
        <button>
          <FaTwitter />
          Remove Twitter
        </button>
      </div>
    </div>
  );
};

export default OauthAssociation;
