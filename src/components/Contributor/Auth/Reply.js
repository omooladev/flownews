import { BiX } from "react-icons/bi";
import Card from "../../../UI/Card";
import styles from "./Auth.module.css";
const Reply = (props) => {
  const { authReply, onResetAuthReply } = props;
  return (
    <>
      {authReply.type && (
        <Card
          className={`${styles.reply} ${
            authReply.type === "success" ? styles["success"] : styles["error"]
          }`}
        >
          <p>{authReply.message}</p>
          <BiX className={styles.reply_icon} onClick={onResetAuthReply} />
        </Card>
      )}
    </>
  );
};

export default Reply;
