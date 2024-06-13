//<---------- import modules ---------->
import { useCallback, useContext } from "react";
import { BiX } from "react-icons/bi";
import { AuthContext } from "../store/Auth/auth-context";
import styles from "./InfoModal.module.css";

const InfoModal = () => {
  const { infoModal, onChangeInfoModal } = useContext(AuthContext);

  const closeInfoModalHandler = useCallback(() => {
    onChangeInfoModal(false, "");
  }, [onChangeInfoModal]);

  return (
    <>
      {infoModal.show && (
        <>
          <div className={styles.backdrop} onClick={closeInfoModalHandler}></div>
          <div className={styles["info-modal"]}>
            <p>{infoModal.message}</p>
            <BiX className={styles.icon} onClick={closeInfoModalHandler} />
          </div>
        </>
      )}
    </>
  );
};

export default InfoModal;
