import ReactDOM from "react-dom";
import Card from "./Card.js";
import styles from "./PopUp.module.css";
const BackDrop = (props) => {
  return <div className={styles.pop_up_overlay} onClick={props.onClick}></div>;
};

const PopUpBox = (props) => {
  return <Card>{props.children}</Card>;
};

const PopUp = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onClick={props.onClick} />, portalElement)}
      {ReactDOM.createPortal(<PopUpBox>{props.children}</PopUpBox>, portalElement)}
    </>
  );
};

export default PopUp;
