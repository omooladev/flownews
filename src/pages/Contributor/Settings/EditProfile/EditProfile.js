import EditProfileCmp from "../../../../components/Contributor/Setting/EditProfile/EditProfile";
import { useTitle } from "../../../../hooks/useTitle";
const EditProfile = () => {
  //----------> Set the title of the page
  useTitle("Your Profile");
  return <EditProfileCmp />;
};

export default EditProfile;
