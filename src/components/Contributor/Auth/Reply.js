import { BiX } from "react-icons/bi";
import Card from "../../../UI/Card";
import styles from "./Auth.module.css";
const Reply = (props) => {
  const { isLoading, authReply, onResetAuthReply } = props;
  return (
    <>
      {!isLoading && authReply && authReply.type && (
        <Card
          className={`${styles.reply} ${
            authReply.type === "success" ? styles["success"] : styles["error"]
          }`}
        >
          <p>{authReply.message}</p>
          <BiX className={styles.cancel_icon} onClick={onResetAuthReply} />
        </Card>
      )}
    </>
  );
};

export default Reply;
