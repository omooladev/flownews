import {useTitle} from "../../../../hooks/useTitle";
import EmailSettingsCmp from "../../../../components/Contributor/Setting/Access/Email/EmailSettings";
const EmailSettings = () => {
  useTitle("Email settings");
  return <EmailSettingsCmp />;
};

export default EmailSettings;
