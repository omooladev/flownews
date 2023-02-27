import { BiX } from "react-icons/bi";
import Card from "../../../UI/Card";
import styles from "./Auth.module.css";
const Reply = (props) => {
  const { isLoading, authMessage, onResetAuthMessage } = props;
  return (
    <>
      {!isLoading && authMessage && authMessage.type && (
        <Card
          className={`${styles.reply} ${
            authMessage.type === "success" ? styles["success"] : styles["error"]
          }`}
        >
          <p>{authMessage.message}</p>
          <BiX className={styles.cancel_icon} onClick={onResetAuthMessage} />
        </Card>
      )}
    </>
  );
};

export default Reply;
