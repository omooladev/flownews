import { useTitle } from "../../../../hooks/useTitle";
import AppearanceCmp from "../../../../components/Contributor/Setting/Appearance/Appearance";

const Appearance = () => {
  useTitle("Appearance");
  return <AppearanceCmp />;
};

export default Appearance;

//----------> Documentation
// Sets the title of the page to Apperance and renders the Appearance component
