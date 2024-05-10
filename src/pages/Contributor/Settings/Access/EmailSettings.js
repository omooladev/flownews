//<---------- IMPORT MODULES ---------->
import {useTitle} from "../../../../hooks/useTitle";
import EmailSettingsCmp from "../../../../components/Contributor/Setting/Access/Email/EmailSettings";
const EmailSettings = () => {
  //<---------- SAVE THE TITLE OF THE PAGE 
  useTitle("Email settings");
  return <EmailSettingsCmp />;
};

export default EmailSettings;
