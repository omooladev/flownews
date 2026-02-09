import { useContext } from "react";
import styles from "./Publish.module.css";
import { AuthContext } from "../../../../store/Auth/auth-context";
const Publish = (props) => {
  const {
    newStory: { value },
  } = useContext(AuthContext);
  const className = props.className || "";
  return (
    <button type="button" className={`${styles.publish} ${className}`} disabled={value.trim().length === 0}>
      Publish
    </button>
  );
};

export default Publish;
