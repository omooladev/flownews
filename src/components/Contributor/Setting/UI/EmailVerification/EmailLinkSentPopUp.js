import PopUp from "../../../../../UI/PopUp";
const EmailLinkSentPopUp = () => {
  const closePopUpHandler = useCallback(
    (event) => {
      event.stopPropagation();
    },
    [history, lastLocation, authMessage, onResetAuthMessage]
  );
  return (
    <PopUp>
      <BiX className={`${styles.icon} ${styles.cancel}`} onClick={closePopUpHandler} />
      <h1>Hi my name is olawole</h1>
    </PopUp>
  );
};

export default EmailLinkSentPopUp;
