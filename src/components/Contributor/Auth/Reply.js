import { BiX } from "react-icons/bi";
import styles from "./Auth.module.css";
const Reply = (props) => {
  const { authReply, onResetAuthReply } = props;
  return (
    <>
      {authReply.type && (
        <div
          className={`${styles.reply} ${
            authReply.type === "success" ? styles["success"] : styles["error"]
          }`}
        >
          <p>{authReply.message}</p>
          <BiX className={styles.reply_icon} onClick={onResetAuthReply} />
        </div>
      )}
    </>
  );
};

export default Reply;
